import { Customer } from "@/models/custumer.model";
import { customerService } from "@/services/customer.services";

export const customerStore = {
  state(): { customers: Customer[]; currentCustomer: Customer | null } {
    return {
      customers: [] as Customer[],
      currentCustomer: null as Customer | null,
    };
  },
  mutations: {
    setCustomers(state, customers) {
      state.customers = customers;
    },
    setCurrentCustomer(state, customer) {
      state.currentCustomer = customer;
    },
  },
  actions: {
    async loadCostumers(
      { commit },
      filter = {
        name: "",
        sort: {
          sortBy: "name" as "name" | "lastOrder" | "lastEdit",
          dir: 1 as 1 | -1,
        },
      }
    ) {
      try {
        const customers = await customerService.getQuery(filter);
        commit("setCustomers", customers);
      } catch (err) {
        throw err;
      }
    },
    async getById({ commit }, id: string) {
      try {
        if (!id) {
          commit("setCurrentCustomer", null);
        }
        const customer = await customerService.getById(id);
        commit("setCurrentCustomer", customer);
      } catch (err) {
        throw err;
      }
    },
    async addCustomer({ commit, state }, customer: Customer) {
      try {
        const newCustomer = await customerService.post(customer);
        commit("setCustomers", [...state.customers, newCustomer]);
      } catch (err) {
        throw err;
      }
    },
    async updateCustomer({ commit, state }, customer: Customer) {
      try {
        const updatedCustomer = await customerService.put(customer);
        if (updatedCustomer) {
          const updatedCustomers = state.customers.map((c: Customer) =>
            c.id === updatedCustomer.id ? updatedCustomer : c
          );
          commit("setCustomers", updatedCustomers);
        }
      } catch (err) {
        throw err;
      }
    },
    async deleteCustomer({ commit, state }, id: string) {
      try {
        const success = await customerService.deleteById(id);
        if (success) {
          const updatedCustomers = state.customers.filter(
            (customer: Customer) => customer.id !== id
          );
          commit("setCustomers", updatedCustomers);
        }
      } catch (err) {
        throw err;
      }
    },
  },
  getters: {
    getCustomers(state) {
      return state.customers;
    },
    getCurrentCustomer(state) {
      return state.currentCustomer;
    },
  },
};
