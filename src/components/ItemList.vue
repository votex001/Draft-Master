<template>
  <ul class="item-list" ref="list" :class="{ scroll: items.length > 5 }">
    <li
      class="item"
      v-for="(item, index) of items"
      :class="{ selected: selected === item[displayKey] }"
      :key="index"
      @click="selectItem(item)"
    >
      {{ item[displayKey] }}
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
export default defineComponent({
  emits: ["selected"],
  props: {
    items: { type: Array as PropType<object[]>, required: true },
    displayKey: { type: String, required: true },
  },
  data() {
    return { selected: null as null | Number };
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
      this.selected = item[this.displayKey];
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
&.scroll{
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
