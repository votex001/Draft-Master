<template>
  <section class="customers">
    <header class="header">
      <h1 class="title">{{ translate.settingsPage.customers }}</h1>
      <section class="text">
        <p>{{ translate.customersOutput.p1 }}</p>
        <ul class="list">
          <li
            v-for="(text, index) in translate.customersOutput.ul"
            :key="index"
          >
            <span class="bold">{{ text.bold }}</span> {{ text.regular }}
          </li>
        </ul>
      </section>
    </header>
    <main class="main">
      <section class="nav-tools">
        <SearchCmp @search="onSearch" />
        <button class="btn" @click="isAdding = true">
          {{ translate.customersOutput.addNew }}
        </button>
      </section>
      <section class="customers-list">
        <CustomersTableHeader @sort="onSort" />
        <CustomersTableBody :customers="customers" />
      </section>
    </main>
    <EditCustomerCmp
      v-if="currentCustomer"
      :customer="currentCustomer"
      @close="navigateTo('/settings')"
      @save="onEditCustomer"
    />
    <AddCustomerCmp
      v-if="isAdding"
      @close="isAdding = false"
      @save="onAddNew"
    />
  </section>
</template>

<script lang="ts">
import AddCustomerCmp from "@/components/modals/AddCustomerCmp.vue";
import EditCustomerCmp from "@/components/modals/EditCustomerCmp.vue";
import SearchCmp from "@/components/shared/SearchCmp.vue";
import CustomersTableBody from "@/components/table-cmps/CustomerTable/CustomersTableBody.vue";
import CustomersTableHeader from "@/components/table-cmps/CustomerTable/CustomersTableHeader.vue";
import { Customer } from "@/models/custumer.model";
import { langService } from "@/services/lang-service";
import { useItemStoreControls } from "@/services/useItemStoreControls";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      filter: {
        name: "",
        sort: {
          sortBy: "name" as "name" | "lastOrder" | "lastEdit",
          dir: 1 as 1 | -1,
        },
      },
      service: useItemStoreControls<Customer>({
        loadAction: "loadCostumers",
        getById: "getById",
        editAction: "updateCustomer",
        saveAction: "addCustomer",
      }),
      isAdding: false,
    };
  },
  computed: {
    translate() {
      const currentLang = langService.currentLang.value;
      return langService.translate[currentLang];
    },
    currentCustomer() {
      return this.$store.getters.getCurrentCustomer;
    },
    customers() {
      return this.$store.getters.getCustomers;
    },
  },
  watch: {
    filter: {
      handler(newFilter) {
        this.service.onQuery(newFilter);
      },
      deep: true,
    },
    "$route.params.id"(newId) {
      this.service.getById(newId);
    },
  },
  mounted() {
    this.service.getById(this.$route.params.id);
  },
  methods: {
    navigateTo(path: string) {
      this.$router.push(path);
    },
    onSearch(value: string) {
      this.filter.name = value;
    },
    async onAddNew(name: string) {
      const newCustomer = await this.service.onAdd({ name });
      this.isAdding = false;
      this.navigateTo(`/settings/customer/${newCustomer.id}`);
    },
    onSort(filter: { column: "name" | "lastOrder" | "lastEdit"; dir: -1 | 1 }) {
      this.filter.sort = { sortBy: filter.column, dir: filter.dir };
    },
    onEditCustomer(customer) {
      this.service.onEdit(customer);
      this.navigateTo("/settings");
    },
  },
  beforeMount() {
    this.service.onQuery();
  },
  components: {
    SearchCmp,
    CustomersTableHeader,
    CustomersTableBody,
    EditCustomerCmp,
    AddCustomerCmp,
  },
});
</script>

<style scoped lang="scss">
.customers {
  width: 100%;
  padding: 0 40px;

  .header {
    max-width: 760px;
    .title {
      text-transform: capitalize;
      font-size: 64px;
      font-weight: 600;
      margin-bottom: 22px;
    }
    .text {
      font-size: 18px;
      .list {
        margin: 10px 0 0 0;
        padding-left: 25px;
        li:first-child {
          max-width: 570px;
        }
        .bold {
          font-weight: 900;
        }
      }
    }
  }
  .main {
    .nav-tools {
      display: flex;
      margin-top: 20px;
      justify-content: space-between;
      align-items: center;
      gap: 100px;
      .btn {
        text-wrap: nowrap;
        font-size: 18px;
        font-weight: 600;
        padding: 10px 20px;
        border-radius: 11px;
      }
    }
    .customers-list {
      display: grid;
      grid-template-columns: repeat(3, 1fr) 150px;
      margin-top: 10px;
    }
  }
}
@media (max-width: 1000px) {
  .customers {
    .main {
      .nav-tools {
        gap: 40px;
        .btn {
          font-size: 14px;
        }
      }
      .customers-list {
        grid-template-columns: 1fr 150px;
      }
    }
  }
}
@media (max-width: 768px) {
  .customers {
    .header {
      .title {
        font-size: 32px;
      }
      .text {
        font-size: 14px;
      }
    }
  }
}
@media (max-width: 480px) {
  .customers {
    padding: 0 10px;
  }
}
@media (max-width: 360px) {
  .customers {
    .header {
      .title {
        font-size: 24px;
      }
      .text {
        font-size: 12px;
      }
    }
  }
}
</style>
