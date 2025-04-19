<template>
  <HeaderCmp />
  <section class="drawings">
    <header class="header">
      <h1></h1>
      <p></p>
    </header>
    <main>
      <SearchCmp />
    </main>
  </section>
</template>

<script lang="ts">
import HeaderCmp from "@/components/header/HeaderCmp.vue";
import SearchCmp from "@/components/shared/SearchCmp.vue";
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
  },
});
</script>

<style scoped lang="scss"></style>
