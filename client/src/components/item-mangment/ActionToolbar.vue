<template>
  <section class="action-toolbar">
    <SearchCmp @search="onSearch" class="search" />
    <section class="item-controls">
      <section class="add-section" ref="addRef">
        <input :placeholder="placeholder" v-model="inputValue" class="input" />
        <button v-if="!showItemsActions" class="btn" @click="btn1">
          {{ btnNames[0] }}
        </button>
        <button v-if="showItemsActions" class="btn" @click="btn2">
          {{ btnNames[1] }}
        </button>
        <button v-if="showItemsActions" class="btn" @click="btn3">
          {{ btnNames[2] }}
        </button>
      </section>
      <section v-if="checkBoxName" class="check-box" ref="checkboxRef">
        <CheckBox
          :checked="checked"
          @update:checked="$emit('update:checked', $event)"
        />
        <span class="name">{{ checkBoxName }}</span>
      </section>
      <section
        class="item-actions"
        :class="{ hidden: !showItemsActions }"
      ></section>
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SearchCmp from "../shared/SearchCmp.vue";
import CheckBox from "../shared/CheckBox.vue";
export default defineComponent({
  props: {
    placeholder: { type: String, required: false, default: "" },
    btnNames: { type: Array as () => string[], required: true },
    showItemsActions: { type: Boolean, required: false, default: false },
    checked: { type: Boolean, default: false },
    checkBoxName: String,
    editName: String,
  },
  emits: ["search", "btn1", "btn2", "btn3", "update:checked", "ref"],
  data() {
    return {
      inputValue: "",
    };
  },
  watch: {
    editName(newValue) {
      this.inputValue = newValue;
    },
  },
  mounted() {
    this.$emit("ref", [this.$refs.addRef, this.$refs.checkboxRef]);
  },
  methods: {
    onSearch(text: string) {
      if (text) {
        this.$emit("search", text);
      }
    },
    btn1() {
      if (this.inputValue) {
        this.$emit("btn1", this.inputValue);
        this.inputValue = "";
      }
    },
    btn2() {
      this.$emit("btn2", this.inputValue);
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
      .btn {
        height: 32px;
        padding: 5px 20px;
      }
      .add-section {
        width: 60%;
        .input {
          width: 150px;
        }
      }
    }
  }
}
</style>
