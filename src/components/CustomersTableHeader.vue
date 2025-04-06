<template>
  <section class="customers-table-header">
    <ColumnHeader name="Name" :arrow="arrows.name" @sort="onSort('name')" />
    <ColumnHeader
      name="Last order"
      :arrow="arrows.lastOrder"
      @sort="onSort('lastOrder')"
    />
    <ColumnHeader
      name="Last edit"
      :arrow="arrows.lastEdit"
      @sort="onSort('lastEdit')"
    />
    <span class="empty"></span>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ColumnHeader from "./ColumnHeader.vue";
export default defineComponent({
  components: { ColumnHeader },
  data() {
    return {
      arrows: {
        name: 1 as -1 | 1 | null,
        lastOrder: null as -1 | 1 | null,
        lastEdit: null as -1 | 1 | null,
      },
    };
  },
  methods: {
    onSort(column: "name" | "lastOrder" | "lastEdit") {
      for (let key in this.arrows) {
        if (key !== column) {
          this.arrows[key] = null;
        }
      }
      if (this.arrows[column] === 1) {
        this.arrows[column] = -1;
      } else {
        this.arrows[column] = 1;
      }
      this.$emit("sort", { column, dir: this.arrows[column] });
    },
  },
});
</script>

<style scoped lang="scss">
.customers-table-header {
  display: grid;
  grid-column: 1 / -1;
  grid-template-columns: subgrid;
}
</style>
