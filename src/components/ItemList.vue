<template>
  <ul class="item-list" ref="list" :class="{ scroll: items.length > 5 }">
    <li
      class="item"
      v-for="(item, index) of items"
      :class="{ selected: selected === item.id }"
      :key="index"
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
  emits: ["selected"],
  props: {
    items: { type: Array as PropType<WithId[]>, required: true },
    displayKey: { type: String, required: true },
  },
  data() {
    return { selected: null as null | string };
  },
  mounted() {
    document.addEventListener("click", this.onClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.onClickOutside);
  },
  methods: {
    onClickOutside(event: MouseEvent) {
      const listEl = this.$refs.list as HTMLElement | undefined;
      if (!listEl || !listEl.contains(event.target as Node)) {
        this.selected = null;
        this.$emit("selected", null);
      }
    },
    selectItem(item: any) {
      this.selected = item.id;
      this.$emit("selected", item);
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
