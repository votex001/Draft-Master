<template>
  <section class="metals-list">
    <section class="table-section">
      <section class="table">
        <ColumnHeader name="Name" :arrow="dir as 1|-1" @sort="onSort" />
        <ItemList
          :items="metals"
          display-key="name"
          @selected="onSelect($event)"
        />
      </section>
      <ActionToolbar
        @search="onSearch($event)"
        :btn-names="['Add', 'Edit', 'Delete']"
        placeholder="Metal"
        :show-items-actions="!!selectedMetalId"
        @btn1="onAddNew($event)"
        @btn2="onEditMetal"
        @btn3="onDeleteMetal"
      />
    </section>
  </section>
</template>

<script lang="ts">
import ActionToolbar from "@/components/ActionToolbar.vue";
import ColumnHeader from "@/components/ColumnHeader.vue";
import ItemList from "@/components/ItemList.vue";
import { Metal } from "@/models/metal.model";
import { langService } from "@/services/lang-service";
import { defineComponent } from "vue";
export default defineComponent({
  computed: {
    translate() {
      const currentLang = langService.currentLang.value;
      return langService.translate[currentLang];
    },
    metals(): Metal[] {
      return this.$store.getters.getMetals;
    },
  },
  data() {
    return {
      selectedMetalId: null as null | string,
      dir: 1 as 1 | -1,
    };
  },
  methods: {
    onSelect(item: Metal | null) {
      this.selectedMetalId = item ? item.id : null;
    },
    onSearch(value: string) {
      console.log(`metal:`, value);
    },
    onAddNew(name: string) {
      console.log("[customersSettings:Add btn]", name);
    },
    onEditMetal() {
      console.log("edit:", this.selectedMetalId);
    },
    onDeleteMetal() {
      console.log("delete:", this.selectedMetalId);
    },
    onSort() {
      this.dir = this.dir === 1 ? -1 : 1;
    },
    loadMetals() {
      this.$store.dispatch("loadMetals");
    },
  },
  beforeMount() {
    this.loadMetals();
  },
  components: { ColumnHeader, ItemList, ActionToolbar },
});
</script>

<style scoped lang="scss"></style>
