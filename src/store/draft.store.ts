import { Customer } from "@/models/custumer.model";
import { Draft } from "@/models/drafts.model";
import { draftService } from "@/services/draft.service";

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
      const emptyDraftMetal = await draftService.createNewDraftMetal(customer);

      const newDraft: Draft = {
        customerId: customer.id,
        customerName: customer.name,
        metals: [emptyDraftMetal],
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
          return draft;
        } catch (e) {
          console.error("Error get draft", e);
        }
      }
      return null;
    },
    updateDraft({ state, commit }, updateFields: Partial<Draft>) {
      if (!state.currentDraft) return;
      const updatedDraft = { ...state.currentDraft, ...updateFields };
      commit("setCurrentDraft", updatedDraft);
      localStorage.setItem("draft", JSON.stringify(updatedDraft));
    },
    removeCurrentDraft({ commit }) {
      localStorage.removeItem("draft");
      commit("setCurrentDraft", null);
    },
  },
  getters: {
    getDraft(state) {
      return state.currentDraft;
    },
  },
};
