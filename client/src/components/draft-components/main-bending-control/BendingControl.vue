<template>
  <main class="bending-control">
    <h2>{{ translate.add }} {{ translate.bending }}</h2>
    <div class="bendings">
      <div
        class="bending-wrapper"
        v-for="(bending, index) in bendings"
        :key="bending.id"
      >
        <h3>{{ translate.bending }} {{ index + 1 }}</h3>
        <button
          v-if="bendings.length > 1"
          @click="close(bending.id)"
          class="close add-btn"
        >
          <img class="img" src="/src/assets/imgs/draft-header/plus.svg"
        </button>
        <div class="input-wrapper">
          <input
            class="input bending"
            :id="bending.id"
            :value="bending.width * 1000"
            type="number"
            @blur="saveWidth(bending.id, $event)"
            @keyup.esc="onEsc(bending.id, $event)"
            @keyup.enter="saveWidth(bending.id, $event)"
            @focus="selectAll"
          />
          <span class="unit-label small">mm</span>
        </div>
      </div>
      <button class="add-btn" @click="addBending">
        <img src="/src/assets/imgs/draft-header/plus.svg" />
      </button>
    </div>
    <div class="deployment">
      <p class="txt">
        {{ translate.deployment }}: {{ totalWidth }}
        <span class="unit-label small">mm</span>
      </p>
      <p class="txt">
        {{ translate.price }}: {{ metalSummaries() }}
        <span class="unit-label small">₪</span>
      </p>
    </div>
  </main>
</template>

<script lang="ts">
import { Bending, DraftMetal } from "@/models/drafts.model";
import { draftService } from "@/services/draft.service";
import { makeId } from "@/services/service";
import { defineComponent, PropType } from "vue";
export default defineComponent({
  emits: ["change"],
  props: {
    metal: { type: Object as PropType<DraftMetal>, required: true },
    translate: Object,
  },
  data() {
    return {
      bendings: [],
      totalWidth: 0,
      metalPrice: 0,
    };
  },
  methods: {
    metalSummaries() {
      return draftService.getMetalSummary(this.metal).totalPrice;
    },
    addBending() {
      const newBending: Bending = { id: makeId(), width: 0 };
      this.bendings.push(newBending);
    },
    close(id: string) {
      this.bendings = this.bendings.filter((b) => b.id !== id);
    },
    saveWidth(id: string, e: Event) {
      const target = e.target as HTMLInputElement;
      target.blur();
      this.bendings.map((b) => {
        if (b.id === id) {
          b.width = +target.value / 1000; //from mm to M
        }
      });
    },
    onEsc(id: string, e: Event) {
      const target = e.target as HTMLInputElement;
      const currentBending = this.bendings.find((b) => b.id === id);
      target.value = currentBending.width;
    },
    selectAll(e: Event) {
      const target = e.target as HTMLInputElement;
      target.select();
    },
  },

  created() {
    this.bendings = this.metal.bendings;
    if (!this.bendings.length) {
      this.addBending();
    }
  },
  watch: {
    bendings: {
      handler() {
        const totalWidth = this.bendings.reduce((sum, bending) => {
          return sum + parseFloat(bending.width);
        }, 0);
        this.totalWidth = totalWidth;
        this.$emit("change", {
          ...this.metal,
          bendings: this.bendings,
          deployment: totalWidth,
        });
      },
      deep: true,
      immediate: true,
    },
  },
});
</script>

<style scoped lang="scss">
.wrapper.he {
  .bending-control {
    .bending-wrapper {
      padding: 10px 0px 10px 30px;
      .close {
        left: 0;
        right: unset;
      }
    }
  }
  .deployment {
    left: 0;
    right: unset;
    border-left: none;
    border-right: 1px solid var(--divider);
    .txt {
      direction: rtr;
    }
  }
}
.bending-control {
  display: flex;
  position: relative;
  flex-direction: column;
  padding: 40px 30px;
  width: 100%;
  gap: 30px;
  .bendings {
    display: grid;
    grid-template-columns: repeat(auto-fit, 120px);
    gap: 1rem;
    .bending-wrapper {
      display: flex;
      flex-direction: column;
      gap: 10px;
      position: relative;
      padding: 10px 30px 10px 0;
      width: fit-content;
      .close {
        position: absolute;
        top: 5px;
        right: 5px;
        .img {
          width: 16px;
          height: 16px;
          rotate: 45deg;
        }
      }
    }
    .input-wrapper {
      gap: 10px;
      * {
        color: var(--gray);
      }
      input[type="number"]::-webkit-inner-spin-button,
      input[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      .bending {
        direction: rtl;
        width: 50px;
        border: none;
        background-color: var(--bg);
        outline: none;
      }
    }
  }
  .deployment {
    position: absolute;
    right: 0px;
    top: 0;
    padding: 20px 30px;
    border-left: 1px solid var(--divider);
    border-bottom: 1px solid var(--divider);
  }
}
</style>
