<template>
  <section class="customers-table-header">
    <ColumnHeader
      v-for="key in Object.keys(arrows)"
      :key="key"
      :name="names[key]"
      :arrow="arrows[key]"
      @sort="onSort(key as keyof typeof arrows)"
      class="column-header"
      :class="key"
    />
    <span class="column-header empty"></span>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ColumnHeader from "../ColumnHeader.vue";
export default defineComponent({
  components: { ColumnHeader },
  data() {
    return {
      arrows: {
        name: 1 as -1 | 1 | null,
        lastOrder: null as -1 | 1 | null,
        lastEdit: null as -1 | 1 | null,
      },
      names: {
        name: "Name",
        lastOrder: "Last order",
        lastEdit: "Last edit",
      },
    };
  },
  methods: {
    onSort(column: "name" | "lastOrder" | "lastEdit") {
      Object.keys(this.arrows).forEach((key) => {
        if (key !== column) this.arrows[key] = null;
      });
      this.arrows[column] = this.arrows[column] === 1 ? -1 : 1;
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
  margin-bottom: 1px;
  & > * {
    box-shadow: 0px 1px 1px var(--divider);
  }
}
@media (max-width: 1000px) {
  .customers-table-header {
    & > * {
      display: none;
    }
    & > :first-child,
    & > :last-child {
      display: flex; // show only first and last
    }
  }
}
</style>
