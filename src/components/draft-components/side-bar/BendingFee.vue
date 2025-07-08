<template>
  <section class="bending-fee">
    <div class="metal-control">
      <h2 class="title">Bending fee:</h2>
      <div class="input-wrapper">
        <input
          class="input"
          v-model.number="bendingFee"
          type="number"
          @focus="cacheOrRestore('cache')"
          @keyup.enter="onEnter"
          @blur="onEnter"
          @keyup.esc="cacheOrRestore('restore')"
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
      oldBendingFee: 0,
      checked: false,
    };
  },
  props: { metal: { type: Object as PropType<DraftMetal>, required: true } },
  methods: {
    cacheOrRestore(command: "cache" | "restore") {
      command === "cache"
        ? (this.oldBendingFee = this.bendingFee)
        : (this.bendingFee = this.oldBendingFee);
    },
    onEnter(event) {
      const target = event.target as HTMLInputElement;
      const newVal = target.value;
      if (newVal !== this.metal.paymentPerBending) {
        this.$emit("save", { ...this.metal, paymentPerBending: newVal });
      }
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
      handler(newVal) {},
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
