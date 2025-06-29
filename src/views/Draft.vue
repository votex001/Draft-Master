<template>
  <HeaderCmp />
  <main>
    <DraftHeader :title="draft.customerName" />
    <main>{{ draft }}</main>
    <DraftFooter :metals="draft.metals" :total-price="draft.totalPrice" />
  </main>
</template>

<script lang="ts">
import DraftFooter from "@/components/footers/DraftFooter.vue";
import DraftHeader from "@/components/headers/DraftHeader.vue";
import HeaderCmp from "@/components/headers/HeaderCmp.vue";
import { metalService } from "@/services/metal.service";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    HeaderCmp,
    DraftHeader,
    DraftFooter,
  },
  computed: {
    draft() {
      const draft = this.$store.getters.getDraft;
      if (!draft) {
        this.$router.push("/drafts");
        return;
      }
      document.title = draft.customerName;
      return draft;
    },
  },
  watch: {
    draft(newVal) {
      if (newVal === null) {
        this.$router.push("/drafts");
      }
    },
    "draft.metals": {
      handler(newMetals) {
        const calculatedTotalPrice =
          metalService.getTotalPriceFromMetals(newMetals);
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
  async beforeCreate() {
    await this.$store.dispatch("loadDraftFromStorage");
  },
});
</script>

<style scoped lang="scss"></style>
