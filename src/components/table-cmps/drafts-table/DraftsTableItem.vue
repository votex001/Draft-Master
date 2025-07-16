<template>
  <section class="drafts-table-item">
    <h3 class="name">{{ draft.draftName }}</h3>
    <h4 class="metals">{{ draft.metals.length }}</h4>
    <h4 class="total-price">{{ draft.totalPrice }} ₪</h4>
    <h4 class="last-edit">
      {{ new Date(draft.lastEdit).toLocaleDateString() }}
    </h4>
    <div class="btns">
      <router-link class="button" to="/drafts">
        <img
          src="/src/assets/imgs/column-body/edit.svg"
          alt="edit"
          class="icon"
        />
        <img
          src="/src/assets/imgs/column-body/edit-hover.svg"
          alt="edit"
          class="icon-hover"
        />
      </router-link>
      <button class="button" @click="$emit('delete', draft.id)">
        <img
          src="/src/assets/imgs/column-body/Trash.svg"
          alt="edit"
          class="icon"
        />
        <img
          src="/src/assets/imgs/column-body/Trash-hover.svg"
          alt="edit"
          class="icon-hover"
        />
      </button>
    </div>
  </section>
</template>

<script lang="ts">
import { Draft } from "@/models/drafts.model";
import { defineComponent, PropType } from "vue";
export default defineComponent({
  emits: ["delete"],
  props: { draft: { type: Object as PropType<Draft>, required: true } },
});
</script>

<style scoped lang="scss">
.drafts-table-item {
  display: grid;
  grid-column: 1 / -1;
  grid-template-columns: subgrid;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: var(--selected);
  }
  & > * {
    padding: 5px 10px;
  }
  & > :not(.name) {
    justify-self: center;
  }

  .name {
    text-wrap: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .btns {
    display: flex;
    padding: 5px 10px;
    justify-content: space-around;

    .button {
      display: grid;
      place-content: center;
      cursor: pointer;
      background: none;
      border: none;
      width: 40px;
      height: max-content;
      padding: 0;
      .icon-hover {
        display: none;
      }
      .icon,
      .icon-hover {
        width: 24px;
      }
      &:hover {
        .icon-hover {
          display: block;
        }
        .icon {
          display: none;
        }
      }
    }
  }
}
@media (max-width: 768px) {
  .drafts-table-item {
    & .btns,
    .last-edit {
      display: none;
    }
  }
}
@media (max-width: 580px) {
  .drafts-table-item {
    & .metals {
      display: none;
    }
  }
}
</style>
