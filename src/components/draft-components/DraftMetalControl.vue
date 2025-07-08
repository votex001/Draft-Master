<template>
  <section class="draft-metal-control">
    <div class="side-bar">
      <MetalSelect :metal="metal" @on-select-metal="onUpdateDraftMetal" />
      <TypeSelect :metal="metal" @on-select-type="onUpdateDraftMetal" />
      <PriceThicknessControl :metal="metal" />
      <BendingFee :metal="metal" />
      <WidthAmountInput :metal="metal" />
    </div>
    <main>
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
.draft-metal-control{
  display: flex;
}
.side-bar{
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
  .metal-control{
    margin: 15px 0;
  }
  .title{
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 15px;
  }
  .input{
    width: 60px;
    padding: 5px 0 5px 15px;
    border-radius: 6px;
  }
  .input-wrapper{
    display: flex;
    align-items: center;
    gap: 10px;
    .unit-label{
      font-size: 24px;
      
    }
  }
}
</style>
