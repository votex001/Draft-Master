<template>
  <section class="customers">
    <header>
      <h1 class="title">{{ translate.settingsPage.customers }}</h1>
      <section class="text">
        <p>{{ translate.customersOutput.p1 }}</p>
        <ul class="list">
          <li
            v-for="(text, index) in translate.customersOutput.ul"
            :key="index"
          >
            <span class="bold">{{ text.bold }}</span> {{ text.regular }}
          </li>
        </ul>
      </section>
    </header>
    <main class="main">
      <section class="nav-tools">
        <SearchCmp @search="onSearch" />
        <button class="btn" @click="onAddNew">Add new</button>
      </section>
      <section class="customers-list">
        <CustomersTableHeader @sort="onSort"/>
      </section>
    </main>
  </section>
</template>

<script lang="ts">
import CustomersTableHeader from "@/components/CustomersTableHeader.vue";
import SearchCmp from "@/components/SearchCmp.vue";
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
    onSort(filter: {
      column: "name" | "lastOrder" | "lastEdit";
      dir: "down" | "up";
    }) {
      console.log(filter);
    },
  },
  components: {
    SearchCmp,
    CustomersTableHeader,
  },
});
</script>

<style scoped lang="scss">
.customers {
  width: 100%;
  padding: 0 40px;

  header {
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
    .nav-tools {
      display: flex;
      margin-top: 20px;
      justify-content: space-between;
      align-items: center;
      .btn {
        font-size: 18px;
        font-weight: 600;
        padding: 10px 20px;
        border-radius: 11px;
      }
    }
    .customers-list {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      margin-top: 10px;
      & > * > * {
        border: 1px solid black;
      }
    }
  }
}
</style>
