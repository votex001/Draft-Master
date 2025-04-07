<template>
  <section class="customers-table-body">
    <section v-for="customer of customers" class="customer">
      <div class="name">{{ customer.name }}</div>
      <div class="last-order">
        {{ formatDate(customer.lastOrder) }}
      </div>
      <div class="last-edit">
        {{ formatDate(customer.lastEdit) }}
      </div>
      <div v-if="!customer.isUnchangeable" class="btns">
        <router-link class="button" :to="`/settings/customer/${customer.id}`">
          <img
            src="/src/assets/imgs/column-body/edit.svg"
            alt="edit"
            class="icon"
          />
          <img
            src="/src/assets/imgs/column-body/edit-hover.svg"
            alt="edit"
            class="icon-hover"
          />
        </router-link>
        <button class="button">
          <img
            src="/src/assets/imgs/column-body/Trash.svg"
            alt="edit"
            class="icon"
          />
          <img
            src="/src/assets/imgs/column-body/Trash-hover.svg"
            alt="edit"
            class="icon-hover"
          />
        </button>
      </div>
    </section>
  </section>
</template>

<script lang="ts">
import { Customer } from "@/models/custumer.model";
import { defineComponent } from "vue";
export default defineComponent({
  computed: {
    customers(): Customer[] {
      return this.$store.getters.getCustomers;
    },
  },
  methods: {
    loadCostumers() {
      this.$store.dispatch("loadCostumers");
    },
    formatDate(timestamp: number) {
      return new Date(timestamp).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      });
    },
  },
  beforeMount() {
    this.loadCostumers();
  },
});
</script>

<style scoped lang="scss">
.customers-table-body {
  display: grid;
  grid-column: 1 / -1;
  grid-template-columns: subgrid;
  .customer {
    display: grid;
    grid-column: 1 / -1;
    grid-template-columns: subgrid;
    cursor: pointer;
    &:hover {
      background-color: var(--selected);
    }
    .btns {
        display: flex;
        gap: 30px;
        padding: 5px 10px;
      .button {
        background: none;
        border: none;
        width: 40px;
        height: max-content;
        padding: 0;
        .icon-hover {
          display: none;
        }
        .icon,
        .icon-hover {
          width: 24px;
        }
        &:hover {
          .icon-hover {
            display: block;
          }
          .icon {
            display: none;
          }
        }
      }
    }
  }
}
</style>
