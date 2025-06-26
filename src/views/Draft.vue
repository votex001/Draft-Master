<template>
  <HeaderCmp />
  <main>
    <DraftHeader :title="draft.customerName" />
    <section>{{ draft }}</section>
  </main>
</template>

<script lang="ts">
import DraftHeader from "@/components/headers/DraftHeader.vue";
import HeaderCmp from "@/components/headers/HeaderCmp.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    HeaderCmp,
    DraftHeader,
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
  },
  async beforeCreate() {
    await this.$store.dispatch("loadDraftFromStorage");
  },
});
</script>

<style scoped lang="scss"></style>
