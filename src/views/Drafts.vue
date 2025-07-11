<template>
  <HeaderCmp />
  <UnsavedChangesModal />
  <section class="drafts">
    <header class="header">
      <h1 class="title">{{ translate.drawingsPage.title }}</h1>
      <p>{{ translate.drawingsPage.p }}</p>
    </header>
    <main class="main">
      <section class="controls">
        <SearchCmp />
        <span class="warn">
          To add a new order, you need to join from a computer.
        </span>
        <button class="btn" @click="isOpen = true">
          {{ translate.addNew }}
        </button>
      </section>
      <section class="drafts-table">
        <DraftsTableHeader @sort="console.log" />
      </section>
    </main>
    <ChooseCustomerModal
      v-if="isOpen"
      @close="isOpen = false"
      @select="onSelectCustomer"
    />
  </section>
</template>

<script lang="ts">
import HeaderCmp from "@/components/headers/HeaderCmp.vue";
import ChooseCustomerModal from "@/components/modals/SelectCustomerModal.vue";
import UnsavedChangesModal from "@/components/modals/UnsavedChangesModal.vue";
import SearchCmp from "@/components/shared/SearchCmp.vue";
import DraftsTableHeader from "@/components/table-cmps/drafts-table/DraftsTableHeader.vue";
import { Customer } from "@/models/custumer.model";
import { langService } from "@/services/lang-service";
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    async onSelectCustomer(customer: Customer) {
      const draft = await this.$store.dispatch("createEmptyDraft", customer);
      if (draft) {
        this.$router.push(`/draft/new-draft`);
      }
    },
  },
  computed: {
    translate() {
      return langService.translate.value;
    },
  },
  components: {
    HeaderCmp,
    SearchCmp,
    DraftsTableHeader,
    ChooseCustomerModal,
    UnsavedChangesModal,
  },
});
</script>

<style scoped lang="scss">
.drafts {
  padding: 40px;
  .header{
    .title{
      font-size: 24px;
    }
  }
  .main {
    .controls {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      .warn {
        display: none;
        color: red;
      }
    }
    .drafts-table {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
    }
  }
}
@media (max-width: 768px) {
  .drafts {
    .main {
      .controls {
        display: grid;
        place-content: center;
        .warn {
          display: block;
        }
        .btn {
          display: none;
        }
      }
      .drafts-table {
        grid-template-columns: repeat(3, 1fr);
      }
    }
  }
}
@media (max-width: 480px) {
  .drafts {
    .main {
      .drafts-table {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  }
}
</style>
