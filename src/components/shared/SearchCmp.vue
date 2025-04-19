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
      return langService.translate.value;
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
  max-height: 32px;
  align-items: center;
  background-color: var(--bg);
  &:has(.input:focus) {
    border-color: var(--selected);
  }

  .input {
    border: none;
    flex: 1;
    padding: 0 10px;
    height: 32px;
    &:focus {
      outline: none;
      background-color: var(--white);
    }
  }
  .btn {
    border: none;
    padding: 8px 16px;
    max-height: min-content;
    border-radius: 0;
    .img {
      width: 16px;
      height: 16px;
    }
  }
}
@media (max-width: 1000px) {
  .search {
    min-width: 300px;
  }
}
@media (max-width: 768px) {
  .search {
    min-width: 185px;
    .input {
      width: 100px;
    }
  }
}
</style>
