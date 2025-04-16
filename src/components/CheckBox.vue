<template>
  <section
    class="checkbox"
    :class="{ checked: checkedStatus }"
    @click="onClick"
  >
    <img
      v-if="checkedStatus"
      src="/src/assets/imgs/check-box/✓.svg"
      class="img"
    />
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    checked: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:checked", "change"],
  data() {
    return { checkedStatus: this.checked };
  },
  watch: {
    checked(newVal) {
      this.checkedStatus = newVal;
    },
  },
  methods: {
    onClick() {
      this.checkedStatus = !this.checkedStatus;
      this.$emit("update:checked", this.checkedStatus);
      this.$emit("change", this.checkedStatus);
    },
  },
});
</script>

<style scoped lang="scss">
.checkbox {
  display: grid;
  place-items: center;
  cursor: pointer;
  width: 24px;
  height: 24px;
  user-select: none;
  border-radius: 6px;
  border: 1px solid var(--black);
  transition: all 0.3s ease-out;
  &.checked {
    background-color: var(--checkbox-checked);
    border-color: var(--divider);
  }
  .img {
    width: 16px;
    height: 16px;
  }
}
</style>
