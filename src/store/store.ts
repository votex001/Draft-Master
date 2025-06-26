import { createStore } from "vuex";
import { customerStore } from "./customers.store";
import { metalsStore } from "./metals.store";
import { draftStore } from "./draft.store";

export const store = createStore({
  modules: {
    customerStore,
    metalsStore,
    draftStore,
  },
});
