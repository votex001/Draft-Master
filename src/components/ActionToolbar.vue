<template>
  <section class="action-toolbar">
    <SearchCmp @search="onSearch" class="search" />
    <section class="item-controls">
      <section class="add-section">
        <input :placeholder="placeholder" v-model="inputValue" class="input" />
        <button class="btn" @click="btn1">{{ btnNames[0] }}</button>
      </section>
      <section v-if="checkBoxName" class="check-box">
        <CheckBox
          :checked="checked"
          @update:checked="$emit('update:checked', $event)"
        />
        <span class="name">{{ checkBoxName }}</span>
      </section>
      <section class="item-actions" :class="{ hidden: !showItemsActions }">
        <button class="btn" @click="btn2">{{ btnNames[1] }}</button>
        <button class="btn" @click="btn3">{{ btnNames[2] }}</button>
      </section>
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SearchCmp from "./SearchCmp.vue";
import CheckBox from "./CheckBox.vue";
export default defineComponent({
  props: {
    placeholder: { type: String, required: false, default: "" },
    btnNames: { type: Array as () => string[], required: true },
    showItemsActions: { type: Boolean, required: false, default: false },
    checked: { type: Boolean, default: false },
    checkBoxName: String,
  },
  emits: ["search", "btn1", "btn2", "btn3", "update:checked"],
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
    CheckBox,
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
  .check-box {
    display: flex;
    gap: 5px;
    margin-bottom: 10px;
  }
  .item-controls {
    .btn {
      padding: 10px 20px;
      font-size: 18px;
      font-weight: 600px;
      border-radius: 11px;
    }
    .add-section {
      display: flex;
      gap: 10px;
      margin-bottom: 10px;
      .input {
        border: 1px solid var(--black);
        background-color: var(--white);
        padding: 0 10px;
        width: 168px;
        height: 32px;
        outline: none;
        border-radius: 16px;
        &:placeholder-shown {
          text-transform: capitalize;
        }
      }
      .btn {
        padding: 5px 20px;
      }
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
@media (max-width: 600px) {
  .action-toolbar {
    :deep(.search) {
      width: 100%;
      .input {
        background-color: var(--white);
      }
    }
    .item-controls {
      width: 100%;
      display: flex;
      gap: 10px;
      align-items: center;
      justify-content: space-between;
      .btn {
        height: 32px;
        padding: 5px 20px;
      }
      .add-section {
        width: 60%;
        .input {
          width: 100%;
        }
      }
    }
  }
}
</style>
