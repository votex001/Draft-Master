<template>
  <section class="sidebar">
    <nav class="nav" :class="{ he: currentLang === 'he' }">
      <router-link
        to="/settings"
        class="nav-link"
        :class="{
          active:
            $route.path === '/settings' ||
            $route.path.startsWith('/settings/customer'),
        }"
      >
        <img src="/src/assets/imgs/side-bar/customer.svg" />
        {{ translate.settingsPage.customers }}
      </router-link>

      <router-link
        to="/settings/metals"
        class="nav-link"
        :class="{ active: $route.path.startsWith('/settings/metals') }"
      >
        <img src="/src/assets/imgs/side-bar/metals.svg" />
        {{ translate.settingsPage.metals }}
      </router-link>
    </nav>
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
      return langService.translate.value;
    },
  },
});
</script>

<style lang="scss" scoped>
.sidebar {
  width: 240px;

  .nav {
    display: flex;
    flex-direction: column;
    &.he {
      .nav-link {
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
@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    .nav {
      flex-direction: row;
      &.he {
        .nav-link {
          border-radius: 0;
        }
      }
      .nav-link {
        border-radius: 0;
        width: 50%;
      }
    }
  }
}
</style>
