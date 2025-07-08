<template>
  <section class="price-thickness-control">
    <div>
      <h2 class="title">Metal Price:</h2>
      <div class="input-wrapper">
        <input
          class="input"
          v-model.number="metalPriceValue"
          type="number"
          @keyup.enter="onEnter"
          @blur="save"
          @keyup.esc="cacheOrRestore('price', 'restore')"
          @focus="cacheOrRestore('price', 'cache')"
        /><span class="unit-label">₪</span>
      </div>
    </div>
    <div class="metal-control">
      <h2 class="title">Metal thickness:</h2>
      <div class="input-wrapper">
        <input
          class="input"
          v-model.number="metalThickness"
          type="number"
          min="0.0"
          max="9.9"
          step="0.1"
          @focus="cacheOrRestore('thickness', 'cache')"
          @blur="normalizeMetalThickness"
          @keyup.enter="onEnter"
          @keyup.esc="cacheOrRestore('thickness', 'restore')"
        /><span class="unit-label small">mm</span>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { DraftMetal } from "@/models/drafts.model";
import { defineComponent, PropType } from "vue";
export default defineComponent({
  emits: ["save"],
  props: {
    metal: { type: Object as PropType<DraftMetal>, required: true },
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
    cacheOrRestore(type: "thickness" | "price", command: "cache" | "restore") {
      switch (type) {
        case "thickness":
          command === "cache"
            ? (this.oldMetalThicknessValue = this.metalThickness)
            : (this.metalThickness = this.oldMetalThicknessValue);
          break;
        case "price":
          command === "cache"
            ? (this.oldMetalPriceValue = this.metalPriceValue)
            : (this.metalPriceValue = this.oldMetalPriceValue);
          break;
        default:
          console.log("Unknown type", type);
          break;
      }
    },
    normalizeMetalThickness() {
      if (this.metalThickness < 0.0) {
        this.metalThickness = 0.0;
      } else if (this.metalThickness > 9.9) {
        this.metalThickness = 9.9;
      }
      this.metalThickness = Math.round(this.metalThickness * 10) / 10;
      this.save();
    },
    save() {
      this.$emit("save", {
        ...this.metal,
        metalThickness: this.metalThickness,
        price: this.metalPriceValue,
      });
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
