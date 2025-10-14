import { createStore } from "vuex";
import { customerStore } from "./customers.store";
import { metalsStore } from "./metals.store";
import { draftStore } from "./draft.store";
import { draftsListStore } from "./drafts.list.store";

export const store = createStore({
  modules: {
    customerStore,
    metalsStore,
    draftStore,
    draftsListStore,
  },
});
