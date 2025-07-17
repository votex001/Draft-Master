<template>
  <Modal @close="$emit('close')" :title="translate.addCustomer">
    <main class="add-customer">
      <span class="title">{{ translate.settingsPage.name }}:</span
      ><input
        :placeholder="translate.settingsPage.name"
        v-model="name"
        class="input"
      />
    </main>
    <footer class="footer">
      <button class="btn" @click="name ? $emit('save', name) : $emit('close')">
        {{ translate.settingsPage.save }}
      </button>
      <button class="btn white" @click="$emit('close')">
        {{ translate.settingsPage.cancel }}
      </button>
    </footer>
  </Modal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Modal from "./Modal.vue";
import { langService } from "@/translate/lang-service";
export default defineComponent({
  data() {
    return {
      name: "",
    };
  },
  computed: {
    translate() {
      return langService.translate.value;
    },
  },
  emits: ["close", "save"],
  components: {
    Modal,
  },
});
</script>

<style scoped lang="scss">
.add-customer {
  padding: 30px 20px;
  width: fit-content;
  .title {
    text-transform: capitalize;
    font-size: 18px;
    font-weight: 600;
  }
  .input {
    border: 1px solid var(--black);
    border-radius: 11px;
    margin: 0 10px;
    padding: 5px 10px;
    &:placeholder-shown {
      text-transform: capitalize;
    }
  }
}
.footer {
  display: flex;
  justify-content: end;
  padding: 0 20px 10px 20px;
  gap: 20px;
}
</style>
