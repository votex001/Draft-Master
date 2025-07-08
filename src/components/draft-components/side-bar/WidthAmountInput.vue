<template>
  <section class="width-amount-input">
    <div class="metal-control">
      <h2 class="title">Width:</h2>
      <div class="input-wrapper">
        <input
          class="input width"
          v-model.number="width"
          type="number"
          @keyup.enter="onEnter"
          step="250"
          @blur="onEnter"
        />
        <span class="unit-label">mm</span>
      </div>
    </div>
    <div class="metal-control">
      <h2 class="title">Amount:</h2>
      <input
        class="input"
        v-model.number="amount"
        type="number"
        @keyup.enter="onEnter"
        @blur="onEnter"
      />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      width: 0,
      amount: 0,
    };
  },
  props: { metal: { type: Object, required: true } },
  methods: {
    onEnter(event) {
      event.target.blur();
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
