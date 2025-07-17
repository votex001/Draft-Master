<template>
  <section class="draft">
    <HeaderCmp />
    <main class="draft-main" v-if="draft">
      <DraftHeader
        :title="draft.draftName"
        @add="onAddMetal"
        :is-loading="isLoading"
        @save="saveNewDraft"
        :translate="translate.header"
      />
      <MainDraft :metals="draft.metals" @save="saveNewMetalArr" />
      <DraftFooter :metals="draft.metals" :total-price="draft.totalPrice" />
    </main>
  </section>
</template>

<script lang="ts">
import DraftFooter from "@/components/footers/DraftFooter.vue";
import DraftHeader from "@/components/headers/DraftHeader.vue";
import HeaderCmp from "@/components/headers/HeaderCmp.vue";
import { Draft, DraftMetal } from "@/models/drafts.model";
import MainDraft from "@/outlets/MainDraft.vue";
import { customerService } from "@/services/customer.services";
import { draftService } from "@/services/draft.service";
import { draftTranslate } from "@/translate/draft.translate";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    HeaderCmp,
    DraftHeader,
    MainDraft,
    DraftFooter,
  },
  data() {
    return {
      isLoading: true,
    };
  },
  methods: {
    saveNewMetalArr(metals: DraftMetal[]) {
      const newDraft = { ...this.draft, metals };
      this.$store.dispatch("updateDraft", newDraft);
    },
    async onAddMetal() {
      this.isLoading = true;
      const customerId = this.draft.customerId;
      const customer = await customerService.getById(customerId);
      const updatedDraft = { ...this.draft };
      const emptyMetalDraft = await draftService.createNewDraftMetal(customer);
      updatedDraft.metals.push(emptyMetalDraft);
      await this.$store.dispatch("updateDraft", updatedDraft);
      this.isLoading = false;
    },
    async saveNewDraft(draftName: string) {
      const updatedDraft: Draft = { ...this.draft, draftName };
      await this.$store.dispatch("saveDraftToList", updatedDraft);
      await this.$store.dispatch("removeCurrentDraft");
      this.$router.push("/drafts");
    },
  },
  computed: {
    draft() {
      const draft = this.$store.getters.getDraft;
      if (!draft) {
        return;
      } else {
        document.title = draft?.customerName;
        return draft as Draft;
      }
    },
    translate() {
      return draftTranslate;
    },
  },
  watch: {
    draft: {
      immediate: true,
      handler(newVal) {
        if (!newVal && !this.isLoading) {
          this.$nextTick(() => {
            this.$router.push("/drafts");
          });
        }
      },
    },
    "draft.metals": {
      handler(newMetals) {
        if (!newMetals) return;
        const calculatedTotalPrice =
          draftService.getTotalPriceFromMetals(newMetals);
        if (this.draft.totalPrice !== calculatedTotalPrice) {
          this.$store.dispatch("updateDraft", {
            totalPrice: calculatedTotalPrice,
          });
        }
      },
      deep: true,
      immediate: true,
    },
  },
  async created() {
    const id = this.$route.params.id;
    if (id) {
      await this.$store.dispatch("getDraftById", id);
    }
    await this.$store.dispatch("loadDraftFromStorage");
    this.isLoading = false;
  },
});
</script>

<style scoped lang="scss">
.draft {
  height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr;
  .draft-main {
    display: grid;
    min-height: max-content;
    grid-template-rows: min-content auto min-content;
  }
}
</style>
