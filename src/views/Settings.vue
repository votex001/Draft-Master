<template>
  <section class="settings">
    <HeaderCmp />
    <main class="main" :class="{ he: currentLang === 'he' }">
      <SideBar />
      <router-view />
    </main>
  </section>
</template>

<script lang="ts">
import HeaderCmp from "@/components/HeaderCmp.vue";
import SideBar from "@/components/SideBar.vue";
import { langService } from "@/services/lang-service";
import { computed } from "vue";

export default {
  computed: {
    currentLang() {
      return langService.currentLang.value;
    },
  },
  components: { HeaderCmp, SideBar },
};
</script>

<style lang="scss" scoped>
.settings {
  width: 100vw;
  height: 100vh;
  .main {
    display: flex;
    flex-direction: row;
    margin-top: 50px;
    gap: 45px;
  }
}
</style>
