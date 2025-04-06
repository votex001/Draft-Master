<template>
  <section class="column-header" @click="onClick">
    <p>{{ name }}</p>
    <img
      src="/src/assets/imgs/column-header/arrow.svg"
      alt="arrow"
      v-if="arrow"
      class="arrow"
      :class="{ rotate: arrow === -1 }"
    />
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "Column Header",
  props: {
    name: { type: String, required: true },
    arrow: { type: Number as PropType<-1 | 1 | null>, required: false },
  },
  emits: ["sort"],
  methods: {
    onClick() {
      this.$emit("sort");
    },
  },
});
</script>

<style scoped lang="scss">
.column-header {
  display: flex;
  justify-content: space-between;
  user-select: none;
  cursor: pointer;
  padding: 5px 10px;
  .arrow {
    width: 24px;
    height: 24px;
    transition: transform 0.3s ease-out;
    &.rotate {
      transform: rotate(180deg);
    }
  }
}
</style>
