<template>
  <section class="lang">
    <button
      @click="changeLang('en')"
      class="button"
      :class="{ selected: currentLang === 'en' }"
    >
      En
    </button>
    <button
      @click="changeLang('he')"
      class="button"
      :class="{ selected: currentLang === 'he' }"
    >
      He
    </button>
  </section>
</template>

<script lang="ts">
import { langService } from "@/services/lang-service";
import { defineComponent } from "vue";

export default defineComponent({
  computed: {
    currentLang() {
      return langService.currentLang.value;
    },
    translate() {
      return langService.translate[this.currentLang];
    },
  },
  methods:{
    changeLang(lang: "en" | "he"){
      langService.changeLang(lang)
    }
  }
});
</script>

<style scoped lang="scss">
.lang {
  display: flex;
  gap: 10px;
  .button {
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
@media (max-width: 480px) {
  .lang {
    .button {
      font-size: 14px;
    }
  }
}
@media (max-width: 360px) {
  .lang {
    .button {
      font-size: 12px;
    }
  }
}
</style>
