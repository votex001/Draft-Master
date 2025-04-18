<template>
  <div class="overlay" @click="onClose" />
  <section class="modal">
    <header class="header">
      <h1 class="title">{{ title }}</h1>
      <button class="close" @click="onClose">
        <img src="/src/assets/imgs/modal/Close.svg" alt="close" class="img" />
      </button>
    </header>
    <main class="main">
      <slot />
    </main>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    title: String,
  },
  emits: ["close"],
  methods: {
    onClose() {
      this.$emit("close");
    },
  },
});
</script>

<style scoped lang="scss">
.overlay {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.7);
  inset: 0;
  z-index: 1000;
}
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 400px;
  height: fit-content;
  background-color: var(--white);
  z-index: 1000;
  border-radius: 12px;
  box-shadow: 0px 2px 2px var(--black);
  .header {
    position: relative;
    height: 43px;
    display: grid;
    place-items: center;
    .title {
      font-size: 22px;
      font-weight: bold;
    }
    .close {
      position: fixed;
      padding: 0;
      margin: 0;
      border: 0;
      background: none;
      right: 10px;
      top: 10px;
      .img {
        height: 24px;
        width: 24px;
      }
    }
  }
}
@media (max-width: 480px) {
  .modal {
    min-width: 100vw;
  }
}
</style>
