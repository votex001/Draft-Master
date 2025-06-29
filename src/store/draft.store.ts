import { Customer } from "@/models/custumer.model";
import { Draft } from "@/models/drafts.model";

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
    createEmptyDraft({ commit }, customer: Customer) {
      if (!customer) {
        commit("setCurrentDraft", null);
        localStorage.removeItem("draft");
        return null;
      }
      // console.log(customer);
      const newDraft: Draft = {
        customerId: customer.id,
        customerName: customer.name,
        metals: [
          {
            amount: 6,
            bendings: [],
            deployment: 0,
            metalPrice: customer.prices["Default"] | 1,
            name: "Default",
            paymentPerBending: customer.prices["Bending price"] | 1,
            price: customer.prices["Default"] | 1,
            type: "Default",
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
