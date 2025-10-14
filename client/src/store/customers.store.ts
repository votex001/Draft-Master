import { Customer } from "@/models/custumer.model";
import { customerService } from "@/services/customer.services";
interface Filter {
  name: string;
  sort: {
    sortBy: "name" | "lastOrder" | "lastEdit";
    dir: 1 | -1;
  };
}
export const customerStore = {
  state(): {
    customers: Customer[];
    currentCustomer: Customer | null;
    customerFilter: null | Filter;
  } {
    return {
      customers: [] as Customer[],
      currentCustomer: null as Customer | null,
      customerFilter: null,
    };
  },
  mutations: {
    setCustomers(state, customers: Customer[]) {
      state.customers = customers;
    },
    setCurrentCustomer(state, customer: Customer) {
      state.currentCustomer = customer;
    },
    setFilter(state, filter: Filter) {
      state.customerFilter = filter;
    },
  },
  actions: {
    async loadCostumers(
      { commit },
      filter: Filter = {
        name: "",
        sort: {
          sortBy: "name",
          dir: 1,
        },
      }
    ) {
      try {
        const customers = await customerService.getQuery(filter);
        commit("setFilter", filter);
        commit("setCustomers", customers);
        return customers;
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
        return customer;
      } catch (err) {
        throw err;
      }
    },
    async addCustomer({ dispatch, state }, customer: Customer) {
      try {
        const newCustomer = await customerService.post(customer);
        dispatch("loadCostumers", state.customerFilter);

        return newCustomer;
      } catch (err) {
        throw err;
      }
    },
    async updateCustomer({ dispatch, state }, customer: Customer) {
      try {
        const updatedCustomer = await customerService.put(customer);
        dispatch("loadCostumers", state.customerFilter);

        return updatedCustomer;
      } catch (err) {
        throw err;
      }
    },
    async deleteCustomer({ dispatch, state }, id: string) {
      try {
        await customerService.deleteById(id);
        return dispatch("loadCostumers", state.customerFilter);
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
