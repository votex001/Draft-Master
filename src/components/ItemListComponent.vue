<template>
  <section class="item-list-component">
    <section class="table-section">
      <section class="table">
        <ColumnHeader :name="headerName" :arrow="dir" @sort="onSort" />
        <ItemList
          :items="items"
          :display-key="displayKey"
          @selected="onSelect"
        />
      </section>
      <ActionToolbar
        @search="onSearch"
        :btn-names="['Add', 'Edit', 'Delete']"
        :placeholder="placeholder"
        :show-items-actions="!!selectedId && !isUnchangeable"
        @btn1="onAddNewItem"
        @btn2="onEdit"
        @btn3="onDelete"
        :checked="checked"
        @update:checked="$emit('update:checked', $event)"
        :check-box-name="checkBoxName"
      />
    </section>
  </section>
</template>

<script lang="ts">
import ActionToolbar from "@/components/ActionToolbar.vue";
import ColumnHeader from "@/components/ColumnHeader.vue";
import ItemList from "@/components/ItemList.vue";
import { WithId } from "@/models/metal.model";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  emits: ["add", "edit", "delete", "query", "select", "update:checked"],
  props: {
    headerName: String,
    displayKey: String,
    items: Array as PropType<WithId[]>,
    placeholder: String,
    checked: { type: Boolean, default: false },
    checkBoxName: String,
  },
  data() {
    return {
      selectedId: null as string | null,
      isUnchangeable: false,
      dir: 1 as 1 | -1,
      searchValue: "",
    };
  },
  methods: {
    onSelect(item: any | null) {
      this.selectedId = item ? item.id : null;
      this.isUnchangeable = item?.isUnchangeable ?? false;
      this.$emit("select", item);
    },
    onSort() {
      this.dir = this.dir === 1 ? -1 : 1;
      this.emitQuery();
    },
    onSearch(value: string) {
      this.searchValue = value;
      this.emitQuery();
    },
    emitQuery() {
      this.$emit("query", {
        dir: this.dir,
        [this.displayKey]: this.searchValue,
      });
    },
    onAddNewItem(name: string) {
      this.$emit("add", { [this.displayKey]: name });
    },
    onEdit() {
      this.$emit("edit", this.selectedId);
    },
    onDelete() {
      this.$emit("delete", this.selectedId);
    },
  },
  components: {
    ActionToolbar,
    ColumnHeader,
    ItemList,
  },
});
</script>

<style scoped lang="scss"></style>
