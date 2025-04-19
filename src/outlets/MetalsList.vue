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
import ItemListComponent from "@/components/item-mangment/ItemListComponent.vue";
import { Metal } from "@/models/metal.model";
import { useItemStoreControls } from "@/services/useItemStoreControls";
import { langService } from "@/services/lang-service";

export default defineComponent({
  name: "MetalList",
  components: { ItemListComponent },
  data() {
    return {
      logic: useItemStoreControls<Metal & { id: string }>({
        loadAction: "loadMetals",
        saveAction: "saveMetal",
        deleteAction: "deleteMetal",
        editAction: "saveMetal",
      }),
    };
  },

  computed: {
    translate() {
      return langService.translate.value;

    },
    metals(): Array<Metal & { id: string }> {
      return this.$store.getters.getMetals;
    },
  },

  beforeMount() {
    this.logic.onQuery();
  },

  methods: {
    onEdit(value) {
      this.logic.onEdit(value);
    },
  },
});
</script>
