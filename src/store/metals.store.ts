import { Metal, MetalType } from "@/models/metal.model";
import { metalService } from "@/services/metal.service";
import { metalTypesService } from "@/services/metal.types.service";
import { createStore } from "vuex";

interface Filter {
  name: string;
  dir: 1 | -1;
}

export const metalsStore = {
  state(): {
    metals: Metal[];
    metalTypes: MetalType[];
    metalFilter: Filter;
    metalTypeFilter: Filter;
  } {
    return {
      metals: [],
      metalTypes: [],
      metalFilter: { name: "", dir: 1 as 1 | -1 },
      metalTypeFilter: { name: "", dir: 1 as 1 | -1 },
    };
  },
  mutations: {
    setMetals(state, metals) {
      state.metals = metals;
    },
    setMetalTypes(state, metalType) {
      state.metalTypes = metalType;
    },
    setMetalFilter(state, filter) {
      state.metalFilter = filter;
    },
    setMetalTypeFilter(state, filter) {
      state.metalTypeFilter = filter;
    },
  },
  actions: {
    // Metal Actions
    async loadMetals({ commit }, filter = { name: "", dir: 1 as 1 | -1 }) {
      try {
        const metals = await metalService.getQuery(filter);
        commit("setMetalFilter", filter);
        commit("setMetals", metals);
      } catch (err) {
        throw err;
      }
    },

    async saveMetal({ dispatch, state }, metal: Metal) {
      try {
        await metalService.saveMetal(metal);
        await dispatch("loadMetals", state.metalFilter);
      } catch (err) {
        throw err;
      }
    },

    async deleteMetal({ commit, state }, id: string) {
      try {
        const success = await metalService.deleteById(id);
        if (success) {
          const updatedMetals = state.metals.filter((m: Metal) => m.id !== id);
          commit("setMetals", updatedMetals);
        }
      } catch (err) {
        throw err;
      }
    },
    // MetalTypes Actions
    async loadMetalTypes({ commit }, filter = { type: "", dir: 1 as 1 | -1 }) {
      try {
        const metalsTypes = await metalTypesService.getQuery(filter);
        commit("setMetalTypeFilter", filter);
        commit("setMetalTypes", metalsTypes);
      } catch (err) {
        throw err;
      }
    },
    async saveMetalType({ dispatch, state }, metalType: MetalType) {
      try {
        await metalTypesService.saveMetalType(metalType);
        await dispatch("loadMetalTypes", state.metalTypeFilter);
      } catch (err) {
        throw err;
      }
    },

    async deleteMetalType({ commit, state }, id: string) {
      try {
        const success = await metalTypesService.deleteById(id);
        if (success) {
          const updatedList = state.metalTypes.filter(
            (t: MetalType) => t.id !== id
          );
          commit("setMetalTypes", updatedList);
        }
      } catch (err) {
        throw err;
      }
    },
  },
  getters: {
    getMetals(state) {
      return state.metals;
    },
    getMetalTypes(state) {
      return state.metalTypes;
    },
  },
};
