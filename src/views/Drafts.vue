<template>
  <HeaderCmp />
  <UnsavedChangesModal :txt="translate.drawingsPage.UnsavedChangesModal"/>
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
        <DraftsTableHeader @sort="onSort" />
        <div
          :class="{
            'draft-items': draftList.length,
            'empty-wrapper': !draftList.length,
          }"
          @click="onDelete"
        >
          <div class="oops-no-items" v-if="!draftList.length">
            <img src="/src/assets/imgs/drafts-empty-list/draftImg.png" />
            <div class="text">
              <h2>{{ translate.drawingsPage.emptyItems.title }}</h2>
              <p>{{ translate.drawingsPage.emptyItems.txt }}</p>
              <button class="btn" @click="isOpen = true">
                {{ translate.addNew }}
              </button>
            </div>
          </div>
          <DraftsTableItem
            v-if="draftList.length"
            v-for="draft in draftList"
            :draft="draft"
            :key="draft.id"
          />
        </div>
      </section>
    </main>
    <!-- After click on Add new Draft opens modal -->
    <ChooseCustomerModal
      v-if="isOpen"
      @close="isOpen = false"
      @select="onSelectCustomer"
      :title="translate.drawingsPage.chooseCustomer"
    />
  </section>
</template>

<script lang="ts">
import HeaderCmp from "@/components/headers/HeaderCmp.vue";
import ChooseCustomerModal from "@/components/modals/SelectCustomerModal.vue";
import UnsavedChangesModal from "@/components/modals/UnsavedChangesModal.vue";
import SearchCmp from "@/components/shared/SearchCmp.vue";
import DraftsTableItem from "@/components/table-cmps/drafts-table/DraftsTableItem.vue";
import DraftsTableHeader from "@/components/table-cmps/drafts-table/DraftsTableHeader.vue";
import { Customer } from "@/models/custumer.model";
import { langService } from "@/translate/lang-service";
import { defineComponent } from "vue";
import { querySort } from "@/store/drafts.list.store";
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
    onSort(sort: querySort) {
      this.$store.dispatch("loadDraftList", sort);
    },
    onDelete(event: MouseEvent) {
      const target = event.target as HTMLElement;
      const emptyDraftsList = target.closest(".oops-no-items");
      const deleteButton = target.closest(".delete") as HTMLElement;
      if (emptyDraftsList) {
        return;
      }
      if (deleteButton) {
        this.$store.dispatch("deleteDraftFromList", deleteButton.dataset.id);
      }
    },
  },
  computed: {
    translate() {
      return langService.translate.value;
    },
    draftList() {
      return this.$store.getters.getDraftList;
    },
  },
  components: {
    HeaderCmp,
    SearchCmp,
    DraftsTableHeader,
    ChooseCustomerModal,
    UnsavedChangesModal,
    DraftsTableItem,
  },
  async created() {
    try {
      await this.$store.dispatch("loadDraftList", {
        column: "draftName",
        dir: 1 as 1 | -1,
      });
    } catch (err) {
      console.log(err);
    }
  },
});
</script>

<style scoped lang="scss">
.drafts {
  padding: 40px;
  .header {
    .title {
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
      grid-template-columns: 3fr repeat(3, 2fr) 1fr;
      .empty-wrapper {
        display: grid;
        grid-template-columns: subgrid;
        grid-column: 1/-1;
        height: 400px;
        .oops-no-items {
          grid-column: 1/-1;
          display: flex;
          width: 340px;
          align-self: center;
          justify-self: center;
          .text {
            display: flex;
            flex-direction: column;
            gap: 5px;
            height: 160px;
            justify-content: center;
            .btn {
              width: max-content;
            }
          }
        }
      }
      .draft-items {
        display: grid;
        grid-template-columns: subgrid;
        grid-column: 1/-1;
        max-height: calc((35 * 19 + 17.5) * 1px);
        overflow-y: auto;
        overflow-x: hidden;
      }
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
@media (max-width: 580px) {
  .drafts {
    .main {
      .drafts-table {
        grid-template-columns: repeat(2, 1fr);
        .draft-items {
          max-height: calc(35 * 18 * 1px);
        }
      }
    }
  }
}
</style>
