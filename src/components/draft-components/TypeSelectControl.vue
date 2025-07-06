<template>
  <section class="type-select">
    <h1>Type:</h1>
    <CustomSelector
      :object-arr="getTypes"
      v-model:selectedId="selectedId"
      view-key="type"
    />
  </section>
</template>

<script lang="ts">
import { useItemStoreControls } from "@/services/useItemStoreControls";
import { defineComponent } from "vue";
import CustomSelector from "../custom-selector/CustomSelector.vue";
import { MetalType } from "@/models/metal.model";
export default defineComponent({
  emits: ["onSelectType"],
  props: {
    metal: { type: Object, required: true },
  },
  data() {
    return {
      metalService: useItemStoreControls<MetalType & { id: string }>({
        loadAction: "loadMetalTypes",
      }),
      selectedId: this.metal.typeId,
    };
  },
  computed: {
    getTypes() {
      let types = this.$store.getters.getMetalTypes as MetalType[];

      const metalId = this.metal?.typeId;

      const exists = types.some((m) => m.id === metalId);

      if (!exists && metalId) {
        const draftType = {
          id: metalId,
          type: this.metal.name,
          paymentPerBending: this.metal.paymentPerBending,
        };
        types = [draftType, ...types];
      }

      return types;
    },
  },
  watch: {
    selectedId(newId: string) {
      const selectedType = this.getTypes.find((t) => t.id === newId);
      if (selectedType) {
        this.$emit("onSelectType", {
          ...this.metal,
          typeId: selectedType.id,
          type: selectedType.type,
          bendingFee: selectedType.paymentPerBending,
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

<style scoped lang="scss"></style>
