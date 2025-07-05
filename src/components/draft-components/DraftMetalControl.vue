<template>
  <section class="draft-metal-control">
    <main>
      <div class="side-bar">
        <CustomSelector
          :object-arr="getMetals"
          v-model:selectedId="selectedId"
          view-key="name"
        />
      </div>
    </main>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CustomSelector from "../custom-selector/CustomSelector.vue";
import { useItemStoreControls } from "@/services/useItemStoreControls";
import { Metal } from "@/models/metal.model";
export default defineComponent({
  props: {
    metal: { type: Object, required: true },
  },
  data() {
    return {
      metalService: useItemStoreControls<Metal & { id: string }>({
        loadAction: "loadMetals",
        saveAction: "saveMetal",
        deleteAction: "deleteMetal",
        editAction: "saveMetal",
      }),
      selectedId: this.metal.metalId,
    };
  },
  computed: {
    getMetals() {
      return this.$store.getters.getMetals;
    },
  },
  components: {
    CustomSelector,
  },
  beforeMount() {
    this.metalService.onQuery();
  },
});
</script>

<style scoped lang="scss"></style>
