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
      @update:selected="onSelect"
      :selected="selectedId"
    />
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ItemListComponent from "@/components/item-mangment/ItemListComponent.vue";
import { MetalType } from "@/models/metal.model";
import { useItemStoreControls } from "@/services/useItemStoreControls";
import { langService } from "@/translate/lang-service";

export default defineComponent({
  components: { ItemListComponent },

  data() {
    return {
      checked: false,
      selectedId: "",
      selectedItem: null,
      logic: useItemStoreControls<MetalType & { id: string }>({
        loadAction: "loadMetalTypes",
        saveAction: "saveMetalType",
        deleteAction: "deleteMetalType",
        editAction: "saveMetalType",
      }),
    };
  },

  computed: {
    translate() {
      return langService.translate.value;
    },
    metalTypes(): Array<MetalType & { id: string }> {
      return this.$store.getters.getMetalTypes;
    },
  },

  beforeMount() {
    this.logic.onQuery();
  },

  watch: {
    selectedItem(newVal) {
      if (newVal) {
        this.selectedId = newVal.id;
      }
    },
  },

  methods: {
    onEdit(value) {
      this.logic.onEdit(value);
    },
    onChangeBendingFee(newVal: boolean) {
      const { onEdit } = this.logic;
      this.checked = newVal;
      if (this.selectedItem) {
        const newType = { ...this.selectedItem, paymentPerBending: newVal };
        onEdit(newType);
      }
    },
    onSelect(type) {
      this.selectedId = type?.id || "";
      this.selectedItem = type;
      if (type) {
        this.checked = type.paymentPerBending;
      }
    },
  },
});
</script>
