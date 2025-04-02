<template>
  <section class="sidebar">
    <nav class="nav" :class="{ he: currentLang === 'he' }">
      <router-link to="/settings" class="nav-link" exact-active-class="active"
        ><img src="/src/assets/imgs/side-bar/customer.svg" />{{
          translate.sideBar.customers
        }}</router-link
      >
      <router-link
        to="/settings/metals"
        class="nav-link"
        exact-active-class="active"
        ><img src="/src/assets/imgs/side-bar/metals.svg" />{{
          translate.sideBar.metals
        }}</router-link
      >
    </nav>
  </section>
</template>

<script lang="ts">
import { langService } from "@/services/lang-service";
import { computed } from "vue";

export default {
  setup() {
    const currentLang = computed(() => langService.currentLang.value);
    const translate = computed(() => langService.translate[currentLang.value]);
    return { currentLang, translate };
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  width: 240px;

  .nav {
    display: flex;
    flex-direction: column;
    &.he{
        .nav-link{
            border-radius: 22px 0 0 22px;
        }
    }
    .nav-link {
      display: flex;
      padding: 10px 16px;
      gap: 16px;
      color: var(--black);
      text-transform: capitalize;
      border-radius: 0 22px 22px 0;
      &.active {
        background-color: var(--selected);
      }
    }
  }
}
</style>
