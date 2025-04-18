<template>
  <section class="home">
    <div class="left-bg"></div>
    <section class="page">
      <header>
        <picture class="logo">
          <source
            srcset="/src/assets/imgs/home-page/Logo-white-small.svg"
            media="(max-width: 480px)"
          />
          <source
            srcset="/src/assets/imgs/home-page/Logo-white.svg"
            media="(max-width: 1000px)"
          />
          <img
            src="/src/assets/imgs/home-page/Logo.svg"
            alt="Responsive Image"
          />
        </picture>
        <section class="btns">
          <nav class="navigation">
            <router-link class="nav-link" to="/drawings">
              {{ translate.drawings }}</router-link
            >
            <router-link class="nav-link" to="/settings">
              {{ translate.settings }}
            </router-link>
          </nav>
          <LangBtn />
        </section>
      </header>
      <main class="main" :class="{ he: currentLang === 'he' }">
        <section>
          <h1 class="title">
            {{ translate.home.h1 }}
          </h1>
          <p class="text">{{ translate.home.p }}</p>
        </section>
        <router-link to="/drawings" class="btn">{{
          translate.home.btn
        }}</router-link>
      </main>
    </section>
  </section>
</template>

<script lang="ts">
import LangBtn from "@/components/header/LangBtn.vue";
import { langService } from "@/services/lang-service";
export default {
  computed: {
    currentLang() {
      return langService.currentLang.value;
    },
    translate() {
      return langService.translate[this.currentLang];
    },
  },
  components: {
    LangBtn,
  },
};
</script>

<style scoped lang="scss">
.home {
  display: grid;
  width: 100vw;
  min-height: 100vh;
  grid-template-columns: 1fr 1128px;

  .left-bg {
    background-image: var(--home-bg-img);
    height: 100vh;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
  .page {
    display: flex;
    padding: 45px 30px;
    flex-direction: column;
    gap: 175px;
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      width: 100%;
      .logo {
        margin-right: 25px;
      }
      .btns {
        display: flex;
        padding: 0 10px;
        gap: 30px;
        align-items: center;
        .navigation {
          display: flex;
          align-items: center;
          text-align: center;
          gap: 5px;
          .nav-link {
            text-decoration: none;
            color: var(--black);
            font-weight: bold;
            font-size: 22px;
            padding: 5px 10px;
            text-transform: capitalize;
            &:hover {
              text-decoration: underline;
            }
          }
        }
      }
    }
    main {
      display: flex;
      flex-direction: column;
      width: 440px;
      gap: 30px;
      &.he {
        align-self: flex-end;
      }
      .title {
        font-size: 64px;
        font-weight: 600;
      }
      .text {
        font-size: 18px;
      }
      .btn {
        width: max-content;
        padding: 10px 20px;
        border: none;
        border-radius: 11px;
        font-size: 18px;
        font-weight: 600;
      }
    }
  }
}
@media (max-width: 1440px) {
  .home {
    grid-template-columns: 1fr 720px;
  }
}
@media (max-width: 1000px) {
  .home {
    display: block;
    color: var(--white);
    background-image: var(--home-bg-img-dark);
    background-repeat: no-repeat;
    background-size: cover;
    .left-bg {
      display: none;
    }
    .page {
      header .btns .navigation .nav-link {
        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        color: var(--white);
      }
      main {
        .title,
        .text {
          text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        }
      }
    }
  }
}
@media (max-width: 768px) {
  .home .page {
    padding: 35px 20px;
    header .btns {
      gap: 15px;
      .navigation {
        .nav-link {
          font-size: 18px;
        }
      }
    }
    main {
      .title {
        font-size: 48px;
      }
      .text {
        font-size: 16px;
      }
      .btn {
        font-size: 16px;
      }
    }
  }
}
@media (max-width: 480px) {
  .home .page {
    padding: 10px 15px;
    header .btns {
      gap: 0px;
      .navigation {
        gap: 0;
        .nav-link {
          font-size: 14px;
        }
      }
    }
    main {
      width: 300px;
      .title {
        font-size: 32px;
      }
      .text {
        font-size: 12px;
      }
      .btn {
        font-size: 12px;
      }
    }
  }
}
// @media (max-width: 360px) {
// }
</style>
