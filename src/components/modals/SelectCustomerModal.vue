<template>
  <Modal @close="$emit('close')" title="Select Customer">
    <div class="select-customer-modal">
      <span v-if="!customers.length" class="loading">
        <LoadingSvg />
      </span>
      <ul class="customer-list">
        <li
          class="customer"
          v-for="customer in customers"
          @click="$emit('select', customer), $emit('close')"
        >
          {{ customer.name }}
        </li>
      </ul>
    </div>
  </Modal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Modal from "./Modal.vue";
import { useItemStoreControls } from "@/services/useItemStoreControls";
import { Customer } from "@/models/custumer.model";
import LoadingSvg from "@/assets/imgs/LoadingSvg.vue";
export default defineComponent({
  emits: ["select", "close"],
  data() {
    return {
      service: useItemStoreControls<Customer>({
        loadAction: "loadCostumers",
        getById: "getById",
        editAction: "updateCustomer",
        saveAction: "addCustomer",
      }),
    };
  },
  components: {
    Modal,
    LoadingSvg,
  },
  computed: {
    customers() {
      return this.$store.getters.getCustomers;
    },
  },
  beforeMount() {
    this.service.onQuery();
  },
});
</script>

<style scoped lang="scss">
.select-customer-modal {
  .loading{
    display: grid;
    place-content: center;
  }
  .customer-list {
    max-height: 400px;
    overflow: auto;
    padding: 0;
    margin: 10px;
    .customer {
      padding: 5px 10px;
      cursor: pointer;
      &:hover {
        background-color: var(--select-hover);
      }
    }
  }
}
</style>
