<template>
  <section class="metal-types-list">
    <ItemListComponent
      header-name="Name"
      placeholder="Type"
      :items="metalTypes"
      display-key="type"
      @add="logic.onAdd"
      @edit="onEdit"
      @delete="logic.onDelete"
      @query="logic.onQuery"
      @select="logic.onSelect"
    />
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ItemListComponent from "@/components/ItemListComponent.vue";
import { MetalType } from "@/models/metal.model";
import { useItemStoreControls } from "@/services/useItemStoreControls";
import { langService } from "@/services/lang-service";

export default defineComponent({
  components: { ItemListComponent },

  computed: {
    translate() {
      const currentLang = langService.currentLang.value;
      return langService.translate[currentLang];
    },
    metalTypes(): Array<MetalType & { id: string }> {
      return this.$store.getters.getMetalTypes;
    },

    logic() {
      const logic = useItemStoreControls<Array<MetalType & { id: string }>>({
        loadAction: "loadMetalTypes",
        saveAction: "saveMetalType",
        deleteAction: "deleteMetalType",
      });
      return logic;
    },
  },

  beforeMount() {
    this.logic.onQuery();
  },

  methods: {
    onEdit() {
      console.log("selectedMetalIdForEdit", this.logic.selectedId.value);
    },
  },
});
</script>
