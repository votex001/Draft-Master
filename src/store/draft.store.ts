import { Customer } from "@/models/custumer.model";
import { Draft } from "@/models/drafts.model";
import { Metal, MetalType } from "@/models/metal.model";
import { metalService } from "@/services/metal.service";
import { metalTypesService } from "@/services/metal.types.service";
import { makeId } from "@/services/service";

export const draftStore = {
  state(): {
    currentDraft: Draft | null;
  } {
    return {
      currentDraft: null,
    };
  },
  mutations: {
    setCurrentDraft(state, currentDraft: Draft | null) {
      state.currentDraft = currentDraft;
    },
  },
  actions: {
    async createEmptyDraft({ commit }, customer: Customer) {
      if (!customer) {
        commit("setCurrentDraft", null);
        localStorage.removeItem("draft");
        return null;
      }
      const defaultMetal: Metal = (
        await metalService.getQuery({
          name: "default",
        })
      )[0];
      const defaultType: MetalType = (
        await metalTypesService.getQuery({
          type: "default",
        })
      )[0];
      // console.log(customer);
      const newDraft: Draft = {
        customerId: customer.id,
        customerName: customer.name,
        metals: [
          {
            id: makeId(),
            amount: 1,
            bendings: [],
            deployment: 0,
            metalPrice: customer.prices["Default"] | 1,
            name: defaultMetal.name,
            metalId: defaultMetal.id,
            paymentPerBending: customer.prices["Bending price"] | 1,
            price: customer.prices["Default"] | 1,
            type: defaultType.type,
            typeId: defaultType.id,
            width: 3,
            bendingFee: true,
            metalThickness: 0.5,
          },
          // {
          //   amount: 15,
          //   bendings: [
          //     { width: 30, bendingNum: 1 },
          //     { width: 50, bendingNum: 1 },
          //     { width: 40, bendingNum: 1 },
          //     { width: 30, bendingNum: 1 },
          //   ],
          //   deployment: 0.15,
          //   metalPrice: 8,
          //   name: "Default",
          //   paymentPerBending: 1.5,
          //   price: 8,
          //   type: "Default",
          //   width: 4,
          //   bendingFee: true,
          //   metalThickness: 0.6,
          // },
        ],
        totalPrice: 0,
      };
      commit("setCurrentDraft", newDraft);
      localStorage.setItem("draft", JSON.stringify(newDraft));
      return newDraft;
    },
    loadDraftFromStorage({ commit }) {
      const savedDraft = localStorage.getItem("draft");
      if (savedDraft) {
        try {
          const draft: Draft = JSON.parse(savedDraft);
          commit("setCurrentDraft", draft);
        } catch (e) {
          console.error("Error get draft", e);
        }
      }
    },
    updateDraft({ state, commit }, updateFields: Partial<Draft>) {
      if (!state.currentDraft) return;
      const updatedDraft = { ...state.currentDraft, ...updateFields };
      commit("setCurrentDraft", updatedDraft);
      localStorage.setItem("draft", JSON.stringify(updatedDraft));
    },
  },
  getters: {
    getDraft(state) {
      return state.currentDraft;
    },
  },
};
