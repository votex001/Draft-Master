<template>
  <section class="draft-metal-control">
    <div class="side-bar">
      <MetalSelect :metal="metal" @on-select-metal="onUpdateDraftMetal" />
      <TypeSelect :metal="metal" @on-select-type="onUpdateDraftMetal" />
      <PriceThicknessControl :metal="metal" />
      <BendingFee :metal="metal" />
      <WidthAmountInput :metal="metal" />
    </div>
    <BendingControl :metal="metal" />
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import MetalSelect from "./side-bar/MetalSelect.vue";
import TypeSelect from "./side-bar/TypeSelect.vue";
import PriceThicknessControl from "./side-bar/PriceThicknessControl.vue";
import BendingFee from "./side-bar/BendingFee.vue";
import WidthAmountInput from "./side-bar/WidthAmountInput.vue";
import BendingControl from "./main-bending-control/BendingControl.vue";
import { DraftMetal } from "@/models/drafts.model";
export default defineComponent({
  props: {
    metal: { type: Object as PropType<DraftMetal>, required: true },
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
    BendingControl,
  },
});
</script>

<style scoped lang="scss">
.draft-metal-control {
  display: flex;
}
.side-bar {
  border: 1px solid red;
  padding: 20px;
  width: fit-content;
}
:deep() {
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    opacity: 1;
    pointer-events: auto;
  }
  .metal-control {
    margin: 15px 0;
  }
  .title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 15px;
  }
  .input {
    width: 60px;
    padding: 5px 0 5px 15px;
    border-radius: 6px;
  }
  .input-wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
    .unit-label {
      font-size: 24px;
      &.small {
        font-size: 16px;
      }
    }
  }
}
</style>
