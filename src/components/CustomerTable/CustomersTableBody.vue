<template>
  <section
    class="customers-table-body"
    :class="{ scroll: customers.length > 10 }"
  >
    <section v-for="customer of customers" class="customer">
      <div class="cell">
        <p>{{ customer.name }}</p>
      </div>
      <div class="cell">
        <p v-if="customer.lastOrder">
          {{ formatDate(customer.lastOrder) }}
        </p>
      </div>
      <div class="cell">
        <p v-if="customer.lastEdit">
          {{ formatDate(customer.lastEdit) }}
        </p>
      </div>
      <router-link
        v-if="!customer.isUnchangeable"
        class="btns"
        :to="`/settings/customer/${customer.id}`"
      >
        <p class="button">
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
        </p>
        <button class="button" @click="onRemoveCustomer($event, customer.id)">
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
      </router-link>
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
    onRemoveCustomer(e: Event, id: string) {
      e.stopPropagation();
      e.preventDefault();
      this.$store.dispatch("deleteCustomer", id);
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
  max-height: 367.5px;
  overflow: hidden;
  box-shadow: 0px 1px 1px var(--divider);
  &.scroll {
    overflow-y: auto;
  }

  .customer {
    display: grid;
    grid-column: 1 / -1;
    grid-template-columns: subgrid;
    height: 35px;
    align-items: center;
    cursor: pointer;
    &:hover {
      background-color: var(--selected);
    }
    .cell {
      padding: 5px 10px;
      font-size: 18px;
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
