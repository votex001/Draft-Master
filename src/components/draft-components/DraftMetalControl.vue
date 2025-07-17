<template>
  <section class="draft-metal-control">
    <button
      class="close"
      v-if="showCloseBtn"
      @click="$emit('delete-metal', metal.id)"
    >
      <img src="/src/assets/imgs/draft-header/plus.svg" alt="" />
    </button>
    <div class="side-bar">
      <MetalSelect
        :metal="metal"
        @on-select-metal="onUpdateDraftMetal"
        :title="translate.sideBar.metal"
      />
      <TypeSelect
        :metal="metal"
        @on-select-type="onUpdateDraftMetal"
        :title="translate.sideBar.type"
      />
      <PriceThicknessControl
        :metal="metal"
        @save="onUpdateDraftMetal"
        :title="translate.sideBar"
      />
      <BendingFee
        :metal="metal"
        @save="onUpdateDraftMetal"
        :title="translate.sideBar.bendingFee"
      />
      <WidthAmountInput
        :metal="metal"
        @save="onUpdateDraftMetal"
        :title="translate.sideBar"
      />
    </div>
    <BendingControl
      :metal="metal"
      @change="onUpdateDraftMetal"
      :translate="translate.mainDraft"
    />
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
import { draftTranslate } from "@/translate/draft.translate";
export default defineComponent({
  emits: ["save", "delete-metal"],
  props: {
    metal: { type: Object as PropType<DraftMetal>, required: true },
    showCloseBtn: { type: Boolean, default: false },
  },
  computed: {
    translate() {
      return draftTranslate.value;
    },
  },
  methods: {
    onUpdateDraftMetal(metal) {
      this.$emit("save", metal);
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
  border-top: 1px solid var(--divider);
  position: relative;
  overflow: hidden;
  &:hover {
    .close {
      top: 10px;
    }
  }
  .close {
    cursor: pointer;
    z-index: 2;
    background-color: transparent;
    padding: 0;
    position: absolute;
    top: -50px;
    left: 50%;
    transform: translate(-50%);
    transition: all 1s ease;
    img {
      rotate: 45deg;
      width: 40px;
    }
  }
}
.side-bar {
  border: 1px solid var(--divider);
  border-top: none;
  padding: 12px;
  width: fit-content;
}
:global(.wrapper.he .input) {
  padding: 5px 15px 5px 0px !important;
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
    &:focus {
      outline: 1px solid var(--selected);
    }
  }

  .input-wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .unit-label {
    font-size: 24px;
    &.small {
      font-size: 16px;
    }
  }
}
</style>
