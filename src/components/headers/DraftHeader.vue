<template>
  <header class="draft-header">
    <button class="btn">
      <img class="img" src="/src/assets/imgs/draft-header/arrow-left.svg" />Go
      Back
    </button>
    <h1 class="title">{{ title }}</h1>
    <section class="right-controllers">
      <button class="add-btn">
        <img class="img" src="/src/assets/imgs/draft-header/plus.svg" />
      </button>
      <button class="btn save">Save</button>
      <button class="btn">Print</button>
    </section>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: { title: { type: String, required: true } },
});
</script>

<style scoped lang="scss">
.draft-header {
  width: 100%;
  margin: 10px 0;
  padding: 3px 60px 3px 37px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .btn {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 6px 20px;
    font-size: 18px;
    font-weight: 600;
    .img {
      width: 24px;
      height: 24px;
    }
  }
  .title {
    font-size: 28;
    font-weight: 600;
  }
  .right-controllers {
    display: flex;
    justify-content: space-between;
    width: 255px;
    .add-btn {
      background-color: var(--bg);
      padding: 0;
      &:hover .img {
        opacity: 0.7;
      }
    }
    .save,
    .btn {
      font-size: 18px;
      font-weight: 600;
      padding: 7px 20px;
    }
    .save {
      color: var(--black);
      background-color: var(--bg);
      border: 1px solid var(--black);
      &:hover {
        background-color: var(--select-hover);
      }
    }
  }
}
</style>
