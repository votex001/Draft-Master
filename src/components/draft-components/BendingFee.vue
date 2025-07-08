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
    <div class="metal-control" @click="checked = !checked">
      <CheckBox v-model:checked="checked" />
      <p>Bending fee</p>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CheckBox from "../shared/CheckBox.vue";
export default defineComponent({
  data() {
    return {
      bendingFee: 0,
      checked: false,
    };
  },
  props: { metal: { type: Object, required: true } },
  methods: {
    onEnter(event) {
      event.target.blur();
    },
  },
  components: { CheckBox },
  beforeMount() {
    this.bendingFee = this.metal.paymentPerBending;
    this.checked = this.metal.bendingFee;
  },
});
</script>

<style scoped lang="scss"></style>
