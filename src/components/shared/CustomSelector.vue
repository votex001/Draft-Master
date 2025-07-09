<template>
  <section class="custom-selector">
    <button class="select-button" @click="isOpen = !isOpen">
      <p>
        {{ selectedValue ?? "No options available" }}
      </p>
      <img
        class="img"
        src="/src/assets/imgs/column-header/arrow.svg"
        :class="isOpen ? 'open' : ''"
      />
    </button>

    <ul v-if="itemsToShow.length" class="items" :class="isOpen ? 'open' : ''">
      <li
        @click="selectItem(item)"
        class="item"
        v-for="(item, index) in itemsToShow"
        :key="index"
        v-if="itemsToShow.length"
        :class="{ selected: item.id === selectedId }"
      >
        {{ formatItem(item) }}
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
export default defineComponent({
  data() {
    return {
      isOpen: false,
    };
  },
  props: {
    objectArr: { type: Array as PropType<Object[]>, required: false },
    stringArr: { type: Array as PropType<String[]>, required: false },
    selectedId: { type: String, required: true },
    viewKey: { type: String, required: false },
  },
  methods: {
    formatItem(item: any): string {
      if (typeof item === "string") return item;
      if (this.viewKey && typeof item === "object") return item[this.viewKey];
      return "";
    },
    selectItem(item) {
      if (typeof item === "object" && item.id) {
        this.$emit("update:selectedId", item.id);
        this.isOpen = false;
      } else if (typeof item === "string") {
        this.$emit("update:selectedId", item);
        this.isOpen = false;
      }
    },
  },
  computed: {
    resolvedViewKey(): string | undefined {
      if (this.viewKey) return this.viewKey;
      if (this.objectArr?.length) {
        return Object.keys(this.objectArr[0])[0];
      }
      return undefined;
    },
    selectedValue(): string | undefined {
      if (this.objectArr?.length && this.resolvedViewKey) {
        const index = this.selectedId
          ? this.objectArr.findIndex((obj) => obj.id === this.selectedId)
          : 0;
        const obj = this.objectArr[index] ?? this.objectArr[0];
        return obj?.[this.resolvedViewKey];
      } else if (this.stringArr?.length) {
        const index = this.selectedId
          ? this.stringArr.findIndex((str) => str === this.selectedId)
          : 0;
        return this.stringArr[index] ?? this.stringArr[0];
      }
      return undefined;
    },
    itemsToShow(): any[] {
      return this.objectArr ?? this.stringArr ?? [];
    },
  },
});
</script>

<style scoped lang="scss">
.custom-selector {
  .select-button {
    display: flex;
    align-items: center;
    padding: 10px;
    gap: 10px;
    border: 1px solid var(--black);
    border-radius: 6px;
    margin-bottom: 15px;
    text-wrap: nowrap;
    .img {
      transition: all ease-out 0.3s;

      &.open {
        rotate: 180deg;
      }
    }
  }
  .items {
    max-height: 0;
    overflow: hidden;
    transition: all ease-out 0.3s;
    background-color: white;
    width: 150px;
    padding: 0;
    margin: 0;
    text-wrap: nowrap;
    &.open {
      max-height: 200px;
      overflow-y: auto;
      border-radius: 6px;
      border: 1px solid var(--black);
      margin-bottom: 15px;
    }
    .item {
      cursor: pointer;
      padding: 5px 5px 5px 15px;
      &.selected {
        background-color: var(--selected);
        cursor: default;
        pointer-events: none;
      }
      &:hover {
        background-color: var(--select-hover);
      }
    }
  }
}
</style>
