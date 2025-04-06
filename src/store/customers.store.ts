import { Customer } from "@/models/custumer.model";
import { customerService } from "@/services/customer.services";
import Vuex from "vuex";

export const store = new Vuex.Store({
  state(): { customers: Customer[]; currentCustomer: Customer | null } {
    return {
      customers: [],
      currentCustomer: null,
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
    async loadCostumers({ commit }, filter = "") {
      try {
        const customers = await customerService.getQuery(filter);
        commit("setCustomers", customers);
      } catch (err) {
        throw err;
      }
    },
    async getById({ commit }, id: string) {
      try {
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
});
