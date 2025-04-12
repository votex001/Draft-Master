<template>
  <section class="types-list">
    <section class="table-section">
      <section class="table">
        <ColumnHeader name="Name" :arrow="dir as 1|-1" @sort="onSort()" />
        <ItemList
          :items="metalTypes"
          display-key="type"
          @selected="onSelect($event)"
        />
      </section>
      <ActionToolbar
        @search="onSearch($event)"
        :btn-names="['Add', 'Edit', 'Delete']"
        placeholder="Type"
        :show-items-actions="!!selectedTypeId"
        @btn1="onAddNew($event)"
        @btn2="onEditType"
        @btn3="onDeleteType"
      />
    </section>
  </section>
</template>

<script lang="ts">
import ActionToolbar from "@/components/ActionToolbar.vue";
import ColumnHeader from "@/components/ColumnHeader.vue";
import ItemList from "@/components/ItemList.vue";
import { MetalType } from "@/models/metal.model";
import { langService } from "@/services/lang-service";
import { defineComponent } from "vue";
export default defineComponent({
  computed: {
    translate() {
      const currentLang = langService.currentLang.value;
      return langService.translate[currentLang];
    },
    metalTypes() {
      return this.$store.getters.getMetalTypes;
    },
  },
  data() {
    return {
      selectedTypeId: null as null | string,
      dir: 1 as 1 | -1,
    };
  },
  methods: {
    onSelect(item: MetalType | null) {
      this.selectedTypeId = item ? item.id : null;
    },
    onSearch(value: string) {
      console.log(`type:`, value);
    },
    onAddNew(name: string) {
      console.log("[customersSettings:Add btn]:", name);
    },
    onEditType() {
      console.log("edit:", this.selectedTypeId);
    },
    onDeleteType() {
      console.log("delete:", this.selectedTypeId);
    },
    onSort() {
      this.dir = this.dir === 1 ? -1 : 1;
    },
    loadMetals() {
      this.$store.dispatch("loadMetalTypes");
    },
  },
  beforeMount() {
    this.loadMetals();
  },
  components: { ColumnHeader, ItemList, ActionToolbar },
});
</script>

<style scoped lang="scss"></style>
