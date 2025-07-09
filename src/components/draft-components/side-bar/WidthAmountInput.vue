<template>
  <section class="width-amount-input">
    <div class="metal-control">
      <h2 class="title">Width:</h2>
      <div class="input-wrapper">
        <input
          class="input width"
          v-model.number="width"
          type="number"
          step="250"
          @focus="cacheOrRestore('width', 'cache')"
          @keyup.enter="onEnter"
          @blur="save"
          @keyup.esc="cacheOrRestore('width', 'restore')"
        />
        <span class="unit-label small">mm</span>
      </div>
    </div>
    <div class="metal-control">
      <h2 class="title">Amount:</h2>
      <input
        class="input"
        v-model.number="amount"
        type="number"
        @focus="cacheOrRestore('amount', 'cache')"
        @keyup.enter="onEnter"
        @blur="save"
        @keyup.esc="cacheOrRestore('amount', 'restore')"
      />
    </div>
  </section>
</template>

<script lang="ts">
import { DraftMetal } from "@/models/drafts.model";
import { defineComponent, PropType } from "vue";
export default defineComponent({
  emits: ["save"],
  data() {
    return {
      width: 0,
      oldWidth: 0,
      amount: 0,
      oldAmount: 0,
    };
  },
  props: { metal: { type: Object as PropType<DraftMetal>, required: true } },
  methods: {
    onEnter(event) {
      event.target.blur();
    },
    cacheOrRestore(type: "width" | "amount", command: "cache" | "restore") {
      switch (type) {
        case "amount":
          command === "cache"
            ? (this.oldAmount = this.amount)
            : (this.amount = this.oldAmount);
          break;
        case "width":
          command === "cache"
            ? (this.oldWidth = this.width)
            : (this.width = this.oldWidth);
          break;
        default:
          console.log("Unknown type", type);
          break;
      }
    },
    save() {
      if (
        +this.amount === this.metal.amount &&
        +this.width === this.metal.width * 1000
      ) {
        return;
      }
      this.$emit("save", {
        ...this.metal,
        amount: +this.amount,
        width: +this.width / 1000,
      });
    },
  },
  beforeMount() {
    this.width = this.metal.width * 1000;
    this.amount = this.metal.amount;
  },
});
</script>

<style scoped lang="scss">
.width-amount-input {
  .metal-control {
    .width {
      width: 120px;
    }
  }
}
</style>
