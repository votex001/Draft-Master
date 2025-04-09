<template>
  <section class="action-toolbar">
    <SearchCmp @search="onSearch" class="search"/>
    <section>
      <input :placeholder="placeholder" v-model="inputValue" />
      <button class="btn">{{ btnNames[0] }}</button>
    </section>
    <section>
      <button class="btn">{{ btnNames[1] }}</button>
      <button class="btn">{{ btnNames[2] }}</button>
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SearchCmp from "./SearchCmp.vue";
export default defineComponent({
    props: {
        placeholder: { type: String, required: false, default: "" },
        btnNames: { type: Array as () => string[], required: true },
    },
    emits: ["search", "btn1", "btn2", "btn3"],
    data() {
      return {
        inputValue: "",
      };
    },
  methods: {
    onSearch(text: string) {
      this.$emit("search", text);
    },
    btn1() {
      this.$emit("btn1", this.searchValue);
    },
    btn2() {
      this.$emit("btn2");
    },
    btn3() {
      this.$emit("btn3");
    },
  },
  components: {
    SearchCmp,
  },
});
</script>

<style scoped lang="scss">
.action-toolbar{
    .search{
        width: 316px;
    }
}
</style>
