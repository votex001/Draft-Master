<template>
  <section class="lang">
    <button
      @click="changeLang('en')"
      class="btn"
      :class="{ selected: currentLang === 'en' }"
    >
      En
    </button>
    <button
      @click="changeLang('he')"
      class="btn"
      :class="{ selected: currentLang === 'he' }"
    >
      He
    </button>
  </section>
</template>

<script lang="ts">
import { langService } from "@/services/lang-service";
import { computed } from "vue";

export default {
  setup() {
    const currentLang = computed(() => langService.currentLang.value);
    function changeLang(lang: "en" | "he") {
      langService.changeLang(lang);
    }
    return { currentLang, changeLang };
  },
};
</script>

<style scoped lang="scss">
.lang {
  display: flex;
  gap: 10px;
  .btn {
    width: min-content;
    padding: 5px;
    border-radius: 6px;
    font-weight: bold;
    font-size: 18px;
    border: 1px solid var(--black);
    &.selected {
      background-color: var(--selected);
    }
  }
}
</style>
