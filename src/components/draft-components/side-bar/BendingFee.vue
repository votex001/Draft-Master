<template>
  <section class="bending-fee">
    <div class="metal-control">
      <h2 class="title">Bending fee:</h2>
      <div class="input-wrapper">
        <input
          class="input"
          v-model.number="bendingFee"
          type="number"
          @keyup.enter="onEnter"
          @blur="onEnter"
        /><span class="unit-label">₪</span>
      </div>
    </div>
    <div class="checkbox-control" @click="checked = !checked">
      <CheckBox :checked="checked" />
      <p>Bending fee</p>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import CheckBox from "../../shared/CheckBox.vue";
import { DraftMetal } from "@/models/drafts.model";
export default defineComponent({
  emits: ["save"],
  data() {
    return {
      bendingFee: 0,
      checked: false,
    };
  },
  props: { metal: { type: Object as PropType<DraftMetal>, required: true } },
  methods: {
    onEnter(event) {
      event.target.blur();
    },
    toggleCheckBox() {
      this.checked = !this.checked;
    },
  },
  components: { CheckBox },
  beforeMount() {
    this.bendingFee = this.metal.paymentPerBending;
    this.checked = this.metal.bendingFee;
  },
  watch: {
    bendingFee: {
      handler(newVal) {
        if (newVal !== this.metal.paymentPerBending) {
          this.$emit("save", { ...this.metal, paymentPerBending: newVal });
        }
      },
      deep: true,
      immediate: true,
    },
    checked: {
      handler(newVal) {
        if (newVal !== this.metal.bendingFee) {
          this.$emit("save", { ...this.metal, bendingFee: newVal });
        }
      },
      deep: true,
      immediate: true,
    },
  },
});
</script>

<style scoped lang="scss">
.checkbox-control {
  cursor: pointer;
  display: flex;
  gap: 10px;
}
</style>
