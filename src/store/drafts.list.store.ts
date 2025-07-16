import { Draft } from "@/models/drafts.model";
import { draftsListService } from "@/services/drafts.list.service";

export interface querySort {
  //   draftName: string;
  //   metals: number;
  //   totalPrice: number;
  //   lastEdit: number;
  column: "draftName" | "metals" | "totalPrice" | "lastEdit";
  dir: 1 | -1;
}

export const draftsListStore = {
  state(): {
    draftList: Draft[];
    draftSort: querySort;
  } {
    return {
      draftList: [],
      draftSort: { column: "draftName", dir: 1 as 1 | -1 },
    };
  },
  mutations: {
    setCurrentList(state, newDraftList: Draft[]) {
      state.draftList = newDraftList;
    },
    setCurrentSort(state, newDraftSort) {
      state.draftSort = newDraftSort;
    },
  },
  actions: {
    async loadDraftList({ commit, state }, sort: querySort) {
      try {
        const draftList = await draftsListService.onQuery(sort);
        commit("setCurrentList", draftList);
        commit("setCurrentSort", sort);
        return draftList;
      } catch (err) {
        throw err;
      }
    },
    async saveDraftToList({ dispatch, state }, draft: Draft) {
      try {
        await draftsListService.saveDraft(draft);
        dispatch("loadDraftList", state.querySort);
      } catch (err) {
        throw err;
      }
    },
    async deleteDraftFromList({ dispatch, state }, draftId: string) {
      try {
        await draftsListService.deleteDraft(draftId);
        dispatch("loadDraftList", state.querySort);
      } catch (err) {
        throw err;
      }
    },
  },
  getters: {
    getDraftList(state) {
      return state.draftList;
    },
  },
};
