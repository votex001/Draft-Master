<template>
  <section class="metals">
    <header class="header">
      <h1 class="title">{{ translate.settingsPage.metals }}</h1>
      <section class="text">
        <p>{{ translate.metalsOutput.p1 }}</p>
        <ul class="list">
          <li v-for="(text, index) in translate.metalsOutput.ul" :key="index">
            <span class="bold">{{ text.bold }}</span> {{ text.regular }}
          </li>
        </ul>
      </section>
    </header>
    <main class="main">
      <nav class="navigation">
        <router-link
          to="/settings/metals"
          class="nav-link"
          exact-active-class="active"
        >
          {{ translate.settingsPage.metals }}
        </router-link>
        <router-link
          to="/settings/metals/types"
          class="nav-link"
          exact-active-class="active"
        >
          {{ translate.settingsPage.types }}
        </router-link>
      </nav>
      <section class="view">
        <router-view />
      </section>
    </main>
  </section>
</template>

<script lang="ts">
import { langService } from "@/services/lang-service";
import { defineComponent } from "vue";

export default defineComponent({
  computed: {
    translate() {
      return langService.translate.value;

    },
  },
});
</script>

<style scoped lang="scss">
.metals {
  width: 100%;
  padding: 0 40px;
  .header {
    max-width: 760px;
    .title {
      text-transform: capitalize;
      font-size: 64px;
      font-weight: 600;
      margin-bottom: 22px;
    }
    .text {
      font-size: 18px;
      .list {
        margin: 10px 0 0 0;
        padding-left: 25px;
        li:first-child {
          max-width: 570px;
        }
        .bold {
          font-weight: 900;
        }
      }
    }
  }
  .main {
    gap: 30px;

    .navigation {
      margin: 10px 0px;
      box-shadow: 0 2px 0px 0px var(--divider);
      .nav-link {
        text-transform: capitalize;
        color: var(--black);
        font-size: 18px;
        font-weight: 600;
        &::after {
          content: "";
          display: inline-block;
          width: 20px;
          background-color: #fff;
        }
        &.active {
          padding-bottom: 3px;
          box-shadow: 0 2px 0 0 var(--selected);
        }
      }
    }
    .view {
      margin-top: 30px;
    }
    :deep() {
      .table-section {
        display: flex;
        gap: 10px;
        .table {
          min-width: 180px;
          border: 1px solid var(--divider);
          background: var(--white);
          scrollbar-color: #e7581a var(--white);
          > :first-child {
            box-shadow: 0px 1px 1px var(--divider);
          }
        }
      }
    }
  }
}
@media (max-width: 768px) {
  .metals {
    .header {
      .title {
        font-size: 32px;
      }
      .text {
        font-size: 14px;
      }
    }
  }
}
@media (max-width: 600px) {
  .metals {
    .main {
      :deep() {
        .table-section {
          flex-direction: column-reverse;
        }
      }
    }
  }
}
@media (max-width: 480px) {
  .metals {
    padding: 0 10px;
  }
}
@media (max-width: 360px) {
  .metals {
    .header {
      .title {
        font-size: 24px;
      }
      .text {
        font-size: 12px;
      }
    }
  }
}
</style>
