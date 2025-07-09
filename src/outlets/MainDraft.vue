<template>
  <section class="main-draft">
    <DraftMetalControl
      v-for="metal in metals"
      :metal="metal"
      @save="saveChanges"
      :show-close-btn="metals.length > 1"
    />
  </section>
</template>

<script lang="ts">
import DraftMetalControl from "@/components/draft-components/DraftMetalControl.vue";
import { DraftMetal } from "@/models/drafts.model";
import { defineComponent, PropType } from "vue";
export default defineComponent({
  emits: ["save"],
  props: {
    metals: { type: Array as PropType<DraftMetal[]>, required: true },
  },
  methods: {
    saveChanges(metal: DraftMetal) {
      const metals = this.metals.map((m) =>
        m.id === metal.id ? (m = metal) : m
      );
      this.$emit("save", metals);
    },
  },
  components: {
    DraftMetalControl,
  },
});
</script>

<style scoped lang="scss">
.main-draft {
  overflow: auto;
}
</style>
