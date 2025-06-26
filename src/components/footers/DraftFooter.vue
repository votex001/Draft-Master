<template>
  <footer class="draft-footer">
    <section class="details">{{ metals }}</section>
    <section class="total-price">
      <h1>
        Total price: <span>{{ totalPrice }}</span> ₪
      </h1>
    </section>
  </footer>
</template>

<script lang="ts">
import { DraftMetal } from "@/models/drafts.model";
import { defineComponent, PropType } from "vue";
export default defineComponent({
  props: {
    totalPrice: { type: Number, required: true },
    metals: { type: Array as PropType<DraftMetal[]>, required: true },
  },
});
</script>
<!-- TODO translate -->
<style scoped lang="scss">
.draft-footer {
  position: fixed;
  bottom: 0;
  height: 172px;
  width: 100%;
  border-top: 1px solid var(--divider);
  display: grid;
  grid-template-columns: 1fr min-content;
  .total-price {
    border-left: 1px solid var(--divider);
    display: grid;
    place-content: center;
    padding: 20px;
    h1 {
      text-wrap: nowrap;
    }
  }
}
</style>
