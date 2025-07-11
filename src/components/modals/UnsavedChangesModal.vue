<template>
  <section
    v-if="shouldShow"
    class="unsaved-changes-modal"
    :class="{ close: !isOpen }"
    @animationend="onAnimationEnd"
  >
    <header class="header">
      <h2 class="title">You have a draft in progress.</h2>
      <button class="close" @click="onClose">
        <img class="img" src="/src/assets/imgs/draft-header/plus.svg" />
      </button>
    </header>
    <main class="main">
      <router-link to="/draft/new-draft" class="btn">Edit draft</router-link>
      <button @click="deleteCurrentDraft" class="btn white">
        Delete draft
      </button>
    </main>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      isOpen: true,
      shouldShow: false,
    };
  },
  methods: {
    onClose() {
      this.isOpen = false;
    },
    onAnimationEnd() {
      if (!this.isOpen) {
        this.shouldShow = false;
      }
    },
    async deleteCurrentDraft() {
      await this.$store.dispatch("removeCurrentDraft");
      this.onClose();
    },
  },
  async beforeCreate() {
    const draft = await this.$store.dispatch("loadDraftFromStorage");
    if (draft) {
      this.shouldShow = true;
    }
  },
});
</script>

<style scoped lang="scss">
@keyframes fadeInUp {
  0% {
    transform: translateY(-300px) translate(-50%);
  }
  100% {
    transform: translateY(0) translate(-50%);
  }
}
@keyframes fadeOutUp {
  0% {
    transform: translateY(0) translate(-50%);
  }
  100% {
    transform: translateY(-300px) translate(-50%);
  }
}
.unsaved-changes-modal {
  background-color: var(--bg);
  width: 400px;
  padding: 0 10px 20px 10px;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translate(-50%);
  animation: fadeInUp 1s ease;
  border: 1px solid var(--divider);
  border-radius: 0 0 6px 6px;
  box-shadow: 0 4px 8px 0 var(--divider), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  &.close {
    animation: fadeOutUp 1s ease;
  }
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    padding: 20px 0px;
    .title {
      font-size: 20px;
    }
    .close {
      position: fixed;
      right: 10px;
      top: 10px;
      background-color: var(--bg);
      .img {
        width: 24px;
        rotate: 45deg;
      }
    }
  }
  .main {
    display: flex;
    justify-content: end;
    gap: 20px;
  }
}
</style>
