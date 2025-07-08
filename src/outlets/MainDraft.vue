<template>
  <section class="main-draft">
    <DraftMetalControl v-for="metal in metals" :metal="metal" />
  </section>
</template>

<script lang="ts">
import DraftMetalControl from "@/components/draft-components/DraftMetalControl.vue";
import { DraftMetal } from "@/models/drafts.model";
import { defineComponent, PropType } from "vue";
export default defineComponent({
  props: {
    metals: { type: Array as PropType<DraftMetal[]>, required: true },
  },
  components: {
    DraftMetalControl,
  },
});
</script>

<style scoped lang="scss">
.main-draft{
  overflow: auto;
}
</style>
