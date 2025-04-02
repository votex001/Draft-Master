<template>
  <header class="header">
    <router-link to="/" class="nav-link">
      <picture class="img">
        <source
          srcset="/src/assets/imgs/header-cmp/Logo-small.svg"
          media="(max-width: 480px)"
        />
        <img src="/src/assets/imgs/header-cmp/Logo.svg" alt="" /> </picture
    ></router-link>
    <section class="btns">
      <nav class="navigation">
        <router-link to="/drawings" class="nav-link">{{
          translate.drawings
        }}</router-link>
        <router-link to="/settings" class="nav-link">{{
          translate.settings
        }}</router-link>
      </nav>
      <LangBtn />
    </section>
  </header>
</template>
<script lang="ts">
import { langService } from "@/services/lang-service";
import LangBtn from "./LangBtn.vue";

export default {
  computed: {
    translate() {
      const currentLang = langService.currentLang.value;
      return langService.translate[currentLang];
    },
  },
  components: {
    LangBtn,
  },
};
</script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  max-width: 100%;
  margin: 0 60px;
  align-items: center;

  .btns {
    display: flex;
    align-items: center;
    gap: 30px;
    .navigation {
      display: flex;
      gap: 10px;
      .nav-link {
        color: var(--black);
        text-transform: capitalize;
        font-weight: bold;
        font-size: 18px;
        padding: 10px 5px;
        &.router-link-active {
          text-decoration: underline;
        }
      }
    }
  }
}
@media (max-width: 768px) {
  .header {
    .img {
      margin-right: 10px;
    }
    .btns {
      .navigation {
        gap: 15px;
      }
    }
  }
}
@media (max-width: 480px) {
  .header {
    margin: 0 30px;
    .btns {
      gap: 5px;
      .navigation {
        gap: 0;
        .nav-link {
          font-size: 14px;
        }
      }
    }
  }
}
@media (max-width: 360px) {
  .header {
    margin: 0 10px;
    .btns {
      .navigation {
        .nav-link {
          font-size: 12px;
        }
      }
    }
  }
}
</style>
