<template>
  <section class="item-list-component">
    <section class="table-section">
      <section class="table">
        <ColumnHeader :name="headerName" :arrow="dir" @sort="onSort" />
        <ItemList
          :items="items"
          :display-key="displayKey"
          :selected="selected"
          @update:selected="onSelect"
          :external-refs="actionRef"
        />
      </section>
      <ActionToolbar
        @ref="setRefs"
        @search="onSearch"
        :btn-names="['Add', 'Edit', 'Delete']"
        :placeholder="placeholder"
        :show-items-actions="!!selectedItem && !isUnchangeable"
        @btn1="onAddNewItem"
        @btn2="onEdit"
        @btn3="onDelete"
        :checked="checked"
        @update:checked="$emit('update:checked', $event)"
        :check-box-name="checkBoxName"
        :edit-name="
          selectedItem && !selectedItem?.isUnchangeable
            ? selectedItem[displayKey]
            : ''
        "
      />
    </section>
  </section>
</template>

<script lang="ts">
import ActionToolbar from "@/components/item-mangment/ActionToolbar.vue";
import ColumnHeader from "@/components/table-cmps/ColumnHeader.vue";
import ItemList from "@/components/item-mangment/ItemList.vue";
import { WithId } from "@/models/metal.model";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  emits: [
    "add",
    "edit",
    "delete",
    "query",
    "select",
    "update:checked",
    "update:selected",
  ],

  props: {
    headerName: String,
    displayKey: String,
    items: Array as PropType<WithId[]>,
    placeholder: String,
    checked: { type: Boolean, default: false },
    checkBoxName: String,
    selected: String,
  },
  data() {
    return {
      selectedItem: null as WithId,
      isUnchangeable: false,
      dir: 1 as 1 | -1,
      searchValue: "",
      actionRef: null,
    };
  },
  methods: {
    onSelect(item: any | null) {
      this.selectedItem = item;
      this.isUnchangeable = item?.isUnchangeable ?? false;
      this.$emit("update:selected", item);
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
    onEdit(name: string) {
      this.$emit("edit", {
        ...this.selectedItem,
        [this.displayKey]: name,
      });
    },
    onDelete() {
      this.$emit("delete", this.selectedItem?.id);
    },
    setRefs(refs: Object[]) {
      this.actionRef = refs;
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
