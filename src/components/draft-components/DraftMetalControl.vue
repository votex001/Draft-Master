<template>
  <section class="draft-metal-control">
    <main>
      <div class="side-bar">
        <MetalSelectControl
          :metal="metal"
          @on-select-metal="onUpdateDraftMetal"
        />
        <TypeSelectControl
          :metal="metal"
          @on-select-type="onUpdateDraftMetal"
        />
      </div>
    </main>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MetalSelectControl from "./MetalSelectControl.vue";
import TypeSelectControl from "./TypeSelectControl.vue";
export default defineComponent({
  props: {
    metal: { type: Object, required: true },
  },
  methods: {
    onUpdateDraftMetal(metal) {
      console.log(metal);
    },
  },
  components: { MetalSelectControl, TypeSelectControl },
});
</script>

<style scoped lang="scss"></style>
