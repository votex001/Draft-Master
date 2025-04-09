import { createStore } from "vuex";
import { customerStore } from "./customers.store";
import { metalsStore } from "./metals.store";

export const store = createStore({
  modules: {
    customerStore,
    metalsStore,
  },
});