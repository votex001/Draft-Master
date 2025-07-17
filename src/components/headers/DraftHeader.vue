<template>
  <header class="draft-header">
    <button
      class="btn"
      :class="{ loading: isLoading }"
      @click="isOpenCloseModal = true"
    >
      <img class="img" src="/src/assets/imgs/draft-header/arrow-left.svg" />{{
        translate.back
      }}
    </button>
    <!-- Customer Name -->
    <h1 class="title">{{ title }}</h1>

    <section class="right-controllers">
      <button
        class="add-btn"
        @click="$emit('add')"
        :class="{ loading: isLoading }"
      >
        <img class="img" src="/src/assets/imgs/draft-header/plus.svg" />
      </button>
      <button
        class="btn save"
        @click="isOpenSaveModal = true"
        :class="{ loading: isLoading }"
      >
        {{ translate.save }}
      </button>
    </section>
    <!-- Close asking -->
    <Modal v-if="isOpenCloseModal" @close="isOpenCloseModal = false">
      <section class="confirm">
        <h2 class="title">{{ translate.goBackConfirm }}</h2>
        <section class="btns">
          <button class="btn white" @click="isOpenCloseModal = false">
            {{ translate.cancel }}
          </button>
          <router-link to="/drafts" class="btn">{{
            translate.back
          }}</router-link>
        </section>
      </section>
    </Modal>
    <!-- Save asking -->
    <Modal v-if="isOpenSaveModal" @close="isOpenSaveModal = false"
      ><section class="confirm">
        <div>
          <h2 class="title">{{ translate.saveConfirm }}</h2>
          <input
            v-model="newSaveName"
            @focus="($event.target as HTMLInputElement).select()"
            class="new-draft-name-input"
          />
        </div>
        <div class="btns">
          <!--Cancel button reset input -->
          <button
            class="btn white"
            @click="(isOpenSaveModal = false), (newSaveName = title)"
          >
            {{ translate.cancel }}
          </button>
          <!-- Save button send emit to draft component -->
          <button class="btn" @click="$emit('save', newSaveName)">
            {{ translate.save }}
          </button>
        </div>
      </section>
    </Modal>
  </header>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Modal from "../modals/Modal.vue";
export default defineComponent({
  emits: ["add", "save"],
  data() {
    return {
      isOpenCloseModal: false, //Opening "Go back" confirm window
      isOpenSaveModal: false, //Opening "Save" confirm window
      newSaveName: this.title,
    };
  },

  components: { Modal },
  props: {
    title: { type: String, required: true },
    isLoading: { type: Boolean, default: false },
    translate: {
      type: Object,
    },
  },
});
</script>

<style scoped lang="scss">
.he {
  .btns {
    direction: ltr;
    flex-direction: row-reverse;
  }
}
.draft-header {
  direction: ltr;
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
    direction: ltr;
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
    width: max-content;
    gap: 20px;
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
    .new-draft-name-input {
      width: 80%;
      margin-top: 20px;
      padding: 5px 5px;
      padding-right: 20px;
      border-radius: 6px;
      &:focus {
        outline-color: var(--selected);
      }
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
