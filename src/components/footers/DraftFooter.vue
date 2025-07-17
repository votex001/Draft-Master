<template>
  <footer class="draft-footer">
    <section class="details" @wheel="handleWheel">
      <div v-for="{ metal } in metalSummaries" :key="metal.id">
        <h1>{{ metal.name }}</h1>
        <p>{{ translate.totalArea }}: {{ metal.totalArea }} м²</p>
        <p v-if="metal.bendingFee">
          {{ translate.bendingFee }}: {{ metal.bendingFee }} ₪
        </p>
        <p>{{ translate.weightFee }}: {{ metal.weightFee }} ₪</p>
        <p>{{ translate.totalPrice }}: {{ metal.totalPrice }} ₪</p>
      </div>
    </section>
    <section class="total-price">
      <h1>
        {{ translate.totalPrice }}: <span>{{ totalPrice }}</span> ₪
      </h1>
    </section>
  </footer>
</template>

<script lang="ts">
import { DraftMetal } from "@/models/drafts.model";
import { draftService } from "@/services/draft.service";
import { defineComponent, PropType } from "vue";
export default defineComponent({
  computed: {
    metalSummaries() {
      return this.metals.map((metal) => {
        return {
          metal: draftService.getMetalSummary(metal),
        };
      });
    },
  },
  methods: {
    handleWheel(e: WheelEvent) {
      if (e.deltaY !== 0) {
        e.preventDefault();
        const details = e.currentTarget as HTMLElement;
        details.scrollLeft += e.deltaY;
      }
    },
  },
  props: {
    totalPrice: { type: Number, required: true },
    metals: { type: Array as PropType<DraftMetal[]>, required: true },
    translate: Object,
  },
});
</script>
<!-- TODO translate -->
<style scoped lang="scss">
.draft-footer {
  bottom: 0;
  height: 150px;
  width: 100%;
  border-top: 1px solid var(--divider);
  display: grid;
  grid-template-columns: 1fr min-content;
  .details {
    display: flex;
    align-items: center;
    gap: 30px;
    padding: 0 30px;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
    scroll-behavior: smooth;
  }
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
