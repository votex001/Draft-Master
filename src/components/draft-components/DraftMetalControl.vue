<template>
  <section class="draft-metal-control">
    <main>
      <div class="side-bar">
        <MetalSelect :metal="metal" @on-select-metal="onUpdateDraftMetal" />
        <TypeSelect :metal="metal" @on-select-type="onUpdateDraftMetal" />
        <PriceThicknessControl :metal="metal" />
        <BendingFee :metal="metal" />
        <WidthAmountInput :metal="metal" />
      </div>
    </main>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MetalSelect from "./MetalSelect.vue";
import TypeSelect from "./TypeSelect.vue";
import PriceThicknessControl from "./PriceThicknessControl.vue";
import BendingFee from "./BendingFee.vue";
import WidthAmountInput from "./WidthAmountInput.vue";
export default defineComponent({
  props: {
    metal: { type: Object, required: true },
  },
  methods: {
    onUpdateDraftMetal(metal) {
      console.log(metal);
    },
  },
  components: {
    MetalSelect,
    TypeSelect,
    PriceThicknessControl,
    BendingFee,
    WidthAmountInput,
  },
});
</script>

<style scoped lang="scss">
:deep() {
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    opacity: 1;
    pointer-events: auto;
  }
}
</style>
