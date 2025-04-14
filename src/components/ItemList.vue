<template>
  <ul class="item-list" ref="list" :class="{ scroll: items.length > 5 }">
    <li
      class="item"
      v-for="item of items"
      :class="{ selected: selectedId === item.id }"
      :key="item.id"
      @click="selectItem(item)"
    >
      {{ item[displayKey] }}
    </li>
  </ul>
</template>

<script lang="ts">
import { WithId } from "@/models/metal.model";
import { defineComponent, PropType } from "vue";
export default defineComponent({
  emits: ["update:selected", "select"],
  props: {
    items: { type: Array as PropType<WithId[]>, required: true },
    displayKey: { type: String, required: true },
    selected: String,
  },
  data() {
    return { selectedId: this.selected as string };
  },
  mounted() {
    document.addEventListener("click", this.onClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.onClickOutside);
  },

  watch: {
    selected(newVal) {
      this.selectedId = newVal;
    },
  },

  methods: {
    onClickOutside(event: MouseEvent) {
      const listEl = this.$refs.list as HTMLElement | undefined;
      if (!listEl || !listEl.contains(event.target as Node)) {
        this.selectedId = false;
        this.$emit("update:selected", null);
        this.$emit("select", null);
      }
    },
    selectItem(item: any) {
      this.selectedId = item.id;
      this.$emit("update:selected", item);
      this.$emit("select", item);
    },
  },
});
</script>

<style scoped lang="scss">
.item-list {
  padding: 0;
  margin: 0;
  max-height: 242px;
  overflow: hidden;
  &.scroll {
    overflow-y: auto;
  }
  .item {
    cursor: pointer;
    list-style: none;
    padding: 10px 5px;
    &:hover {
      background-color: var(--select-hover);
    }
    &.selected {
      background-color: var(--selected);
    }
  }
}
</style>
