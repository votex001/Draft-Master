<template>
  <section class="metal-select metal-control">
    <h2 class="title">Metal:</h2>
    <CustomSelector
      :object-arr="getMetals"
      v-model:selectedId="selectedId"
      view-key="name"
    />
  </section>
</template>

<script lang="ts">
import { Metal } from "@/models/metal.model";
import { useItemStoreControls } from "@/services/useItemStoreControls";
import { defineComponent } from "vue";
import CustomSelector from "../custom-selector/CustomSelector.vue";
export default defineComponent({
  emits: ["onSelectMetal"],
  props: {
    metal: { type: Object, required: true },
  },
  data() {
    return {
      metalService: useItemStoreControls<Metal & { id: string }>({
        loadAction: "loadMetals",
      }),
      selectedId: this.metal.metalId,
    };
  },
  computed: {
    getMetals() {
      let metals = this.$store.getters.getMetals as Metal[];

      const metalId = this.metal?.metalId;

      const exists = metals.some((m) => m.id === metalId);

      if (!exists && metalId) {
        const draftMetal = { id: metalId, name: this.metal.name };
        metals = [draftMetal, ...metals];
      }

      return metals;
    },
  },
  watch: {
    selectedId(newId: string) {
      const selectedMetal = this.getMetals.find((m) => m.id === newId);
      if (selectedMetal) {
        this.$emit("onSelectMetal", {
          ...this.metal,
          metalId: selectedMetal.id,
          name: selectedMetal.name,
        });
      }
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

<style scoped lang="scss">
.metal-select.metal-control{
 margin: 0;
}
</style>
