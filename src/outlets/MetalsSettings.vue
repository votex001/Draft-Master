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
      <section class="metals-list">
        <h1 class="title">{{ translate.settingsPage.metals }}</h1>
        <section class="table-section">
          <section class="table">
            <ColumnHeader
              name="Name"
              :arrow="dir.metal as 1|-1"
              @sort="onSort('metal')"
            />
            <ItemList
              :items="metals"
              display-key="name"
              @selected="onSelect($event, 'metal')"
            />
          </section>
          <ActionToolbar
            @search="onSearch($event, 'metal')"
            :btn-names="['Add', 'Edit', 'Delete']"
            placeholder="Metal"
            :show-items-actions="!!selectedMetal"
          />
        </section>
      </section>
      <section class="metal-types">
        <h1 class="title">{{ translate.settingsPage.types }}</h1>
        <section class="table-section">
          <section class="table">
            <ColumnHeader
              name="Name"
              :arrow="dir.type as 1|-1"
              @sort="onSort('type')"
            />
            <ItemList
              :items="metalTypes"
              display-key="type"
              @selected="onSelect($event, 'type')"
            />
          </section>
          <ActionToolbar
            @search="onSearch($event, 'type')"
            :btn-names="['Add', 'Edit', 'Delete']"
            placeholder="Type"
            :show-items-actions="!!selectedType"
          />
        </section>
      </section>
    </main>
  </section>
</template>

<script lang="ts">
import ActionToolbar from "@/components/ActionToolbar.vue";
import ColumnHeader from "@/components/ColumnHeader.vue";
import ItemList from "@/components/ItemList.vue";
import { Metal, MetalType } from "@/models/metal.model";
import { langService } from "@/services/lang-service";
import { defineComponent } from "vue";

export default defineComponent({
  computed: {
    translate() {
      const currentLang = langService.currentLang.value;
      return langService.translate[currentLang];
    },
    metals(): Metal[] {
      return this.$store.getters.getMetals;
    },
    metalTypes() {
      return this.$store.getters.getMetalTypes;
    },
  },
  data() {
    return {
      selectedMetal: null as null | string,
      selectedType: null as null | string,
      dir: {
        metal: 1,
        type: 1,
      },
    };
  },
  components: { ActionToolbar, ColumnHeader, ItemList },
  methods: {
    onSelect(item: Metal | MetalType | null, table: "metal" | "type") {
      if (table === "metal") {
        this.selectedMetal = item ? item.id : item;
      }
      if (table === "type") {
        this.selectedType = item ? item.id : item;
      }
    },
    onSearch(value: string, item: "metal" | "type") {
      console.log(`${item}:`, value);
    },
    onAddNew() {
      console.log("[customersSettings:Add btn]");
    },
    onSort(item: "metal" | "type") {
      this.dir[item] = this.dir[item] === 1 ? -1 : 1;
    },
    loadMetals() {
      this.$store.dispatch("loadMetals");
      this.$store.dispatch("loadMetalTypes");
    },
  },
  beforeMount() {
    this.loadMetals();
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
    display: flex;
    gap: 30px;
    margin-top: 20px;
    >:first-child{
      border-right: 1px solid var(--divider);
    }
    >*{
      padding-right: 10px;
    }
    .title {
      text-transform: capitalize;
      font-size: 32px;
      margin-bottom: 10px;
    }
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
