<template>
  <section class="bending-fee">
    <div>
      <h2>Bending fee:</h2>
      <div>
        <input
          v-model.number="bendingFee"
          type="number"
          @keyup.enter="onEnter"
        /><span>₪</span>
      </div>
    </div>
    <div @click="checked = !checked">
      <CheckBox v-model:checked="checked" />
      <p >Bending fee</p>
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
    this.checked = this.metal.bendingFee
  },
});
</script>

<style scoped lang="scss"></style>
