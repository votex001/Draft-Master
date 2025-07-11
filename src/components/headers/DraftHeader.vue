<template>
  <header class="draft-header">
    <button class="btn" :class="{ loading: isLoading }" @click="isOpen = true">
      <img class="img" src="/src/assets/imgs/draft-header/arrow-left.svg" />Go
      Back
    </button>
    <h1 class="title">{{ title }}</h1>
    <section class="right-controllers">
      <button
        class="add-btn"
        @click="$emit('add')"
        :class="{ loading: isLoading }"
      >
        <img class="img" src="/src/assets/imgs/draft-header/plus.svg" />
      </button>
      <button class="btn save" :class="{ loading: isLoading }">Save</button>
      <button class="btn" :class="{ loading: isLoading }">Print</button>
    </section>
    <Modal v-if="isOpen" @close="isOpen = false">
      <section class="confirm">
        <h2 class="title">Do you want to quit without saving?</h2>
        <section class="btns">
          <button class="btn white" @click="isOpen = false">Cancel</button>
          <router-link to="/drafts" class="btn">ok</router-link>
        </section>
      </section>
    </Modal>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Modal from "../modals/Modal.vue";
export default defineComponent({
  emits: ["add"],
  data() {
    return {
      isOpen: false, //Opening "Go back" confirm window
    };
  },
  components: { Modal },
  props: {
    title: { type: String, required: true },
    isLoading: { type: Boolean, default: false },
  },
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
  .loading {
    pointer-events: none;
    user-select: none;
  }
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
  .confirm {
    padding: 0 30px 30px 30px;
    .title {
      font-size: 18px;
    }
    .btns {
      display: flex;
      justify-content: end;
      margin-top: 30px;
      gap: 20px;
    }
  }
}
</style>
