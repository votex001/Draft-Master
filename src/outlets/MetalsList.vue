<template>
  <section class="metals-list">
    <ItemListComponent
      :header-name="translate.settingsPage.name"
      :placeholder="translate.settingsPage.metal"
      :items="metals"
      display-key="name"
      @add="logic.onAdd"
      @edit="onEdit"
      @delete="logic.onDelete"
      @query="logic.onQuery"
    />
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ItemListComponent from "@/components/ItemListComponent.vue";
import { Metal } from "@/models/metal.model";
import { useItemStoreControls } from "@/services/useItemStoreControls";
import { langService } from "@/services/lang-service";

export default defineComponent({
  name: "MetalList",
  components: { ItemListComponent },

  computed: {
    translate() {
      const currentLang = langService.currentLang.value;
      return langService.translate[currentLang];
    },
    metals(): Array<Metal & { id: string }> {
      return this.$store.getters.getMetals;
    },
    logic() {
      const logic = useItemStoreControls<Metal & { id: string }>({
        loadAction: "loadMetals",
        saveAction: "saveMetal",
        deleteAction: "deleteMetal",
      });
      return logic;
    },
  },

  beforeMount() {
    this.logic.onQuery();
  },

  methods: {
    onEdit(value) {
      console.log("selectedMetalIdForEdit", value);
    },
  },
});
</script>
