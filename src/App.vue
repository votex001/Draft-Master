<template>
  <section class="wrapper" :class="{ he: currentLang === 'he' }">
    <router-view />
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { langService } from "./services/lang-service";
export default defineComponent({
  computed: {
    currentLang() {
      return langService.currentLang.value;
    },
  },
});
</script>

<style scoped lang="scss"></style>
