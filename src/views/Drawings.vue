<template>
  <HeaderCmp />
  <section class="drawings">
    <header class="header">
      <h1>{{ translate.drawingsPage.title }}</h1>
      <p>{{ translate.drawingsPage.p }}</p>
    </header>
    <main class="main">
      <section class="controls">
        <SearchCmp />
        <button class="btn">{{ translate.addNew }}</button>
      </section>
      <section class="drawings-table">
        <DrawingsTableHeader @sort="console.log" />
      </section>
    </main>
  </section>
</template>

<script lang="ts">
import HeaderCmp from "@/components/header/HeaderCmp.vue";
import SearchCmp from "@/components/shared/SearchCmp.vue";
import DrawingsTableHeader from "@/components/table-cmps/drawings-table/DrawingsTableHeader.vue";
import { langService } from "@/services/lang-service";
import { defineComponent } from "vue";
export default defineComponent({
  computed: {
    translate() {
      return langService.translate.value;
    },
  },
  components: {
    HeaderCmp,
    SearchCmp,
    DrawingsTableHeader,
  },
});
</script>

<style scoped lang="scss">
.drawings {
  padding: 40px;
  .main {
    .controls {
      display: flex;
      justify-content: space-between;
    }
    .drawings-table {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
    }
  }
}
</style>
