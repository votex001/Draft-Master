import { Metal, MetalType } from "@/models/metal.model";
import { metalService } from "@/services/metal.service";
import { metalTypesService } from "@/services/metal.types.service";
import { createStore } from "vuex";

export const metalsStore = {
  state(): { metals: Metal[]; metalTypes: MetalType[] } {
    return {
      metals: [],
      metalTypes: [],
    };
  },
  mutations: {
    setMetals(state, metals) {
      state.metals = metals;
    },
    setMetalTypes(state, metalType) {
      state.metalTypes = metalType;
    },
  },
  actions: {
    // Metal Actions
    async loadMetals({ commit }, filter = { name: "", dir: 1 as 1 | -1 }) {
      try {
        const metals = await metalService.getQuery(filter);
        commit("setMetals", metals);
      } catch (err) {
        throw err;
      }
    },

    async saveMetal({ commit, state }, metal: Metal) {
      try {
        const savedMetal = await metalService.saveMetal(metal);
        const isUpdate = !!metal.id;

        let updatedList: Metal[];
        if (isUpdate) {
          updatedList = state.metals.map((m: Metal) =>
            m.id === savedMetal.id ? savedMetal : m
          );
        } else {
          updatedList = [...state.metals, savedMetal];
        }

        commit("setMetals", updatedList);
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
    async loadMetalTypes({ commit }, filter = { name: "", dir: 1 as 1 | -1 }) {
      try {
        const metalsTypes = await metalTypesService.getQuery(filter);
        commit("setMetalTypes", metalsTypes);
      } catch (err) {
        throw err;
      }
    },
    async saveMetalType({ commit, state }, metalType: MetalType) {
      try {
        const savedType = await metalTypesService.saveMetalType(metalType);
        const isUpdate = !!metalType.id;

        let updatedList: MetalType[];
        if (isUpdate) {
          updatedList = state.metalTypes.map((t: MetalType) =>
            t.id === savedType.id ? savedType : t
          );
        } else {
          updatedList = [...state.metalTypes, savedType];
        }

        commit("setMetalTypes", updatedList);
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
