<template>
  <section class="width-amount-input">
    <div>
      <h2>Width:</h2>
      <input v-model.number="width" type="number" @keyup.enter="onEnter" />
      <span>mm</span>
    </div>
    <div>
      <h2>Amount:</h2>
      <input v-model.number="amount" type="number" @keyup.enter="onEnter" />
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

<style scoped lang="scss"></style>
