<template>
  <section class="drafts-table-header">
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
import { langService } from "@/services/lang-service";
export default defineComponent({
  components: { ColumnHeader },
  computed: {
    names() {
      const translate = langService.translate.value;
      return translate.drawingsPage.tables;
    },
  },
  data() {
    return {
      arrows: {
        draftName: 1 as -1 | 1 | null,
        metals: null as -1 | 1 | null,
        totalPrice: null as -1 | 1 | null,
        lastEdit: null as -1 | 1 | null,
      },
    };
  },
  methods: {
    onSort(
      column: "draftName" | "lastEdit" | "metals" | "totalPrice" | "lastPrint"
    ) {
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
.drafts-table-header {
  margin-top: 10px;
  display: grid;
  grid-column: 1 / -1;
  grid-template-columns: subgrid;
  margin-bottom: 1px;
  background-color: var(--white);
  box-shadow: 0px 4px 4px var(--divider);
  text-wrap: nowrap;
  & > * {
    border-right: 1px solid var(--divider);
  }
}
@media (max-width: 768px) {
  .drafts-table-header {
    & > :nth-child(5),
    & > :nth-child(4),
    & > :last-child {
      display: none;
    }
  }
}
@media (max-width: 580px) {
  .drafts-table-header {
    & > :nth-child(2) {
      display: none;
    }
  }
}
</style>
