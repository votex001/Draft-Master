<template>
  <section class="price-thickness-control">
    <div>
      <h2 class="title">Metal Price:</h2>
      <div>
        <input
          class="input"
          v-model.number="metalPriceValue"
          type="number"
          @keyup.enter="onEnter"
        /><span>₪</span>
      </div>
    </div>
    <div class="metal-control">
      <h2 class="title">Metal thickness:</h2>
      <div>
        <input
          class="input"
          v-model.number="metalThickness"
          type="number"
          min="0.0"
          max="9.9"
          step="0.1"
          @focus="cacheOldValue"
          @blur="normalizeValue"
          @keyup.enter="onEnter"
          @keyup.esc="restoreOldValue"
        /><span>mm</span>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    metal: { type: Object, required: true },
  },
  data() {
    return {
      metalPriceValue: 0,
      oldMetalPriceValue: 0,
      metalThickness: 0.0,
      oldMetalThicknessValue: 0.0,
    };
  },
  methods: {
    cacheOldValue() {
      this.oldValue = this.value;
    },
    normalizeValue() {
      if (this.value < 0.0) {
        this.value = 0.0;
      } else if (this.value > 9.9) {
        this.value = 9.9;
      }
      this.value = Math.round(this.value * 10) / 10;
    },
    restoreOldValue() {
      this.value = this.oldValue;
    },
    onEnter(event) {
      event.target.blur();
    },
  },
  beforeMount() {
    this.metalPriceValue = this.metal.price;
    this.metalThickness = this.metal.metalThickness;
  },
});
</script>

<style scoped lang="scss"></style>
