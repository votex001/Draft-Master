<template>
  <Modal :title="translate.editCustomerCmp.title" @close="$emit('close')">
    <main class="edit-customer">
      <div class="editable-wrapper" ref="wrapper">
        <h1
          class="customer-name"
          ref="editable"
          contenteditable="true"
          @input="onInputName"
          @keydown.enter.prevent="onEnter"
        >
          {{ name }}
        </h1>
      </div>
      <section class="prices">
        <h2 class="title" :class="{ he: currentLang === 'he' }">
          {{ translate.editCustomerCmp.prices }}
        </h2>
        <ul class="prices-list">
          <li
            class="price"
            v-for="Name of Object.keys(customer.prices)"
            :key="Name"
          >
            <p>{{ Name }}</p>
            <span class="wraper">
              <span
                contenteditable="true"
                class="input"
                ref="price"
                @input="onInputPrice($event, Name)"
                @keydown.enter.prevent="onEnter"
                @keydown="onKeydownNumbersOnly"
              >
                {{ prices[Name] }}
              </span>
              ₪
            </span>
          </li>
        </ul>
      </section>
    </main>
    <footer class="btns" :class="{ he: currentLang === 'he' }">
      <button @click="onSave" class="btn">
        {{ translate.settingsPage.save }}
      </button>
      <button @click="$emit('close')" class="btn white">
        {{ translate.settingsPage.cancel }}
      </button>
    </footer>
  </Modal>
</template>

<script lang="ts">
import { Customer } from "@/models/custumer.model";
import { defineComponent, PropType } from "vue";
import Modal from "./Modal.vue";
import { langService } from "@/translate/lang-service";

export default defineComponent({
  emits: ["close", "save"],
  props: {
    customer: { type: Object as PropType<Customer> },
  },
  computed: {
    currentLang() {
      return langService.currentLang.value;
    },
    translate() {
      return langService.translate.value;
    },
  },
  data() {
    return {
      name: this.customer.name,
      prices: { ...this.customer.prices },
    };
  },
  components: {
    Modal,
  },
  mounted() {
    document.addEventListener("click", this.onClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.onClickOutside);
  },
  methods: {
    onInputName(event: Event) {
      const target = event.target as HTMLElement;
      this.name = target.textContent || "";
    },
    onInputPrice(event: Event, name: string) {
      const target = event.target as HTMLElement;
      this.prices[name] = +target.textContent || 0;
    },
    onEnter(event: KeyboardEvent) {
      (event.target as HTMLElement).blur();
    },
    onClickOutside(event: MouseEvent) {
      const wrapper = this.$refs.wrapper as HTMLElement | undefined;
      const editable = this.$refs.editable as HTMLElement | undefined;

      if (!wrapper || !editable) return;

      if (!wrapper.contains(event.target as Node)) {
        editable.blur();
      }
    },
    onKeydownNumbersOnly(event: KeyboardEvent) {
      const allowedKeys = [
        "Backspace",
        "Tab",
        "ArrowLeft",
        "ArrowRight",
        "Delete",
        "Enter",
      ];

      if (!/^[0-9]$/.test(event.key) && !allowedKeys.includes(event.key)) {
        event.preventDefault();
      }
    },
    onSave() {
      const newCustomer = {
        ...this.customer,
        name: this.name,
        prices: this.prices,
        lastEdit: new Date().getTime(),
      };
      this.$emit("save", newCustomer);
    },
  },
});
</script>

<style scoped lang="scss">
.edit-customer {
  width: 700px;
  min-height: 350px;
  padding: 20px 40px;
  .editable-wrapper {
    position: relative;
    display: block;
    max-width: fit-content;
    margin-left: -5px;
    margin-bottom: 20px;

    .customer-name {
      display: inline-block;
      min-width: 1ch;
      white-space: nowrap;
      padding: 2px 4px;
      font-size: 32px;
      background: #fff;
      width: auto;
    }
  }
  .prices {
    position: relative;
    padding-top: 10px;
    .title {
      font-size: 24px;
      font-weight: 600;
      user-select: none;
      position: absolute;
      top: 0;
      left: 0;
      &.he {
        right: 0;
      }
    }
    .prices-list {
      max-height: 250px;
      overflow-y: auto;
      // border: 1px solid;
      list-style: none;
      padding: 0;
      .price {
        display: flex;
        gap: 20px;
        margin: 12px;
        text-wrap: nowrap;
        .input {
          border: 1px solid var(--black);
          border-radius: 6px;
          padding: 5px 15px;
        }
      }
    }
  }
}
.btns {
  display: flex;
  justify-content: flex-end;
  padding: 20px;
  gap: 20px;

  &.he {
    flex-direction: row-reverse;
  }
}

@media (max-width: 768px) {
  .edit-customer {
    width: 100%;
    padding: 20px;
  }
}
</style>
