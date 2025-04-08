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
    <main class="main"></main>
  </section>
</template>

<script lang="ts">
import { langService } from "@/services/lang-service";
import { defineComponent } from "vue";

export default defineComponent({
  computed: {
    translate() {
      const currentLang = langService.currentLang.value;
      return langService.translate[currentLang];
    },
  },
  methods: {
    onSearch(value: string) {
      console.log(value);
    },
    onAddNew() {
      console.log("[customersSettings:Add btn]");
    },
    onSort(filter: { column: "name" | "lastOrder" | "lastEdit"; dir: -1 | 1 }) {
      console.log(filter);
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
  //   .main {

  //   }
}
// @media (max-width: 1000px) {
//   .metals {
//     .main {

//     }
//   }
// }
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
