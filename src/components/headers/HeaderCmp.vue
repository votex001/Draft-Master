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
        <router-link to="/drafts" class="nav-link">{{
          translate.drafts
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
import { defineComponent } from "vue";

export default defineComponent({
  computed: {
    translate() {
      return langService.translate.value;
    },
  },
  components: {
    LangBtn,
  },
});
</script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  max-width: 100%;
  padding: 0 60px;
  align-items: center;
  box-shadow: 0px 1px 1px var(--divider);
  direction: ltr;
  * {
    direction: ltr;
  }
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
    padding: 0 30px;
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
    padding: 0 10px;
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
