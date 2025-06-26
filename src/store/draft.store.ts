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
      const newDraft: Draft = {
        customerId: customer.id,
        customerName: customer.name,
        metals: [],
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
  },
  getters: {
    getDraft(state) {
      return state.currentDraft;
    },
  },
};
