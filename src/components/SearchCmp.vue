<template>
  <section class="search">
    <input
      v-model="searchValue"
      :placeholder="translate.search"
      class="input"
    />
    <button class="btn" @click="emitSearch">
      <img
        src="/src/assets/imgs/search-cmp/search.svg"
        alt="search button"
        class="img"
      />
    </button>
  </section>
</template>

<script lang="ts">
import { langService } from "@/services/lang-service";
import { defineComponent } from "vue";

export default defineComponent({
  emits: ["search"],
  computed: {
    translate() {
      const currentLang = langService.currentLang.value;
      return langService.translate[currentLang];
    },
  },
  data() {
    return {
      searchValue: "",
    };
  },
  methods: {
    emitSearch() {
      this.$emit("search", this.searchValue);
    },
  },
});
</script>

<style scoped lang="scss">
.search {
  display: flex;
  width: 400px;
  border-radius: 32px;
  border: 1px solid var(--black);
  overflow: hidden;
  .input {
    border: none;
    background-color: var(--bg);
    flex: 1;
    padding: 0 10px;
    &:focus {
      outline: none;
    }
  }
  .btn {
    border: none;
    padding: 8px 16px;
    .img {
      width: 16px;
      height: 16px;
    }
  }
}
</style>
