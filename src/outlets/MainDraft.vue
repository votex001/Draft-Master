<template>
  <section class="main-draft">
    <main class="main">
      <section class="side-bar">
        <h3>Metal:</h3>
        <CustomSelector
          :object-arr="getMetals"
          view-key="name"
          v-model:selectedId="selectedId"
        />
      </section>
    </main>
  </section>
</template>

<script lang="ts">
import CustomSelector from "@/components/custom-selector/CustomSelector.vue";
import { Draft, DraftMetal } from "@/models/drafts.model";
import { Metal } from "@/models/metal.model";
import { useItemStoreControls } from "@/services/useItemStoreControls";
import { defineComponent, PropType } from "vue";
export default defineComponent({
  data() {
    return {
      logic: useItemStoreControls<Metal & { id: string }>({
        loadAction: "loadMetals",
        saveAction: "saveMetal",
        deleteAction: "deleteMetal",
        editAction: "saveMetal",
      }),
      selectedId: "",
    };
  },
  computed: {
    getMetals() {
      return this.$store.getters.getMetals;
    },
    defaultId(): string {
      const defaultItem = this.getMetals?.find(
        (item) => item.name === "Default"
      );
      return defaultItem?.id ?? "";
    },
  },
  props: {
    metals: { type: Array as PropType<DraftMetal[]>, required: true },
  },
  components: {
    CustomSelector,
  },
  beforeMount() {
    this.logic.onQuery();
    if (this.defaultId) {
      this.selectedId = this.defaultId;
    }
  },
});
</script>

<style scoped lang="scss">
.main-draft {
}
</style>
