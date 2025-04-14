<template>
  <section class="metal-types-list">
    <ItemListComponent
      :header-name="translate.settingsPage.name"
      :placeholder="translate.settingsPage.type"
      :items="metalTypes"
      display-key="type"
      @add="logic.onAdd"
      @edit="onEdit"
      @delete="logic.onDelete"
      @query="logic.onQuery"
      @select="onSelect"
      :checked="checked"
      @update:checked="onChangeBendingFee"
      check-box-name="Bounding fee"
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

  data() {
    return {
      checked: false,
    };
  },

  computed: {
    translate() {
      const currentLang = langService.currentLang.value;
      return langService.translate[currentLang];
    },
    metalTypes(): Array<MetalType & { id: string }> {
      return this.$store.getters.getMetalTypes;
    },

    logic() {
      const logic = useItemStoreControls<MetalType & { id: string }>({
        loadAction: "loadMetalTypes",
        saveAction: "saveMetalType",
        deleteAction: "deleteMetalType",
        editAction: "saveMetalType",
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
    onChangeBendingFee(newVal: boolean) {
      const { onEdit, onSelect } = this.logic;
      const selectedItem = this.logic.selectedItem.value;
      this.checked = newVal;
      if (selectedItem) {
        const newType = { ...selectedItem, paymentPerBending: newVal };
        onEdit(newType);
      }
    },
    onSelect(type) {
      if (type) {
        this.checked = type?.paymentPerBending;
        this.logic.onSelect(type);
      }
    },
  },
});
</script>
