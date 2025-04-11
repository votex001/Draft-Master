<template>
  <section class="action-toolbar">
    <SearchCmp @search="onSearch" class="search" />
    <section class="add-section">
      <input :placeholder="placeholder" v-model="inputValue" class="input" />
      <button class="btn" @click="btn1">{{ btnNames[0] }}</button>
    </section>
    <section class="item-actions" :class="{ hidden: !showItemsActions }">
      <button class="btn" @click="btn2">{{ btnNames[1] }}</button>
      <button class="btn" @click="btn3">{{ btnNames[2] }}</button>
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SearchCmp from "./SearchCmp.vue";
export default defineComponent({
  showItemsActions: false,
  props: {
    placeholder: { type: String, required: false, default: "" },
    btnNames: { type: Array as () => string[], required: true },
    showItemsActions: { type: Boolean, required: false },
  },
  emits: ["search", "btn1", "btn2", "btn3"],
  data() {
    return {
      inputValue: "",
    };
  },
  methods: {
    onSearch(text: string) {
      this.$emit("search", text);
    },
    btn1() {
      this.$emit("btn1", this.inputValue);
      this.inputValue = "";
    },
    btn2() {
      this.$emit("btn2");
    },
    btn3() {
      this.$emit("btn3");
    },
  },
  components: {
    SearchCmp,
  },
});
</script>

<style scoped lang="scss">
.action-toolbar {
  display: flex;
  flex-direction: column;
  gap: 10px;
  :deep(.search) {
    width: 316px;
    .input {
      background-color: var(--white);
    }
  }

  .btn {
    padding: 10px 20px;
    font-size: 18px;
    font-weight: 600px;
    border-radius: 11px;
  }
  .add-section {
    padding: 5px 0;
    .input {
      border: 1px solid var(--black);
      background-color: var(--white);
      padding: 0 10px;
      width: 168px;
      height: 32px;
      outline: none;
      border-radius: 16px;
      margin-right: 10px;
    }
    .btn {
      padding: 5px 20px;
    }
  }
  .item-actions {
    display: flex;
    gap: 10px;
    &.hidden {
      display: none;
    }
  }
}
</style>
