import { Customer } from "@/models/custumer.model";
import { customers } from "./test.data";
import { metalTypesService } from "./metal.types.service";
const STORAGE_KEY = "customers";
const DELAY = 500;

export const customerService = { getQuery, getById, post, put, deleteById };

async function getQuery(filter?: {
  sort: {
    sortBy: "name" | "lastOrder" | "lastEdit";
    dir: 1 | -1;
  };
  name: string;
}): Promise<Customer[]> {
  try {
    const customers = loadCustomers();

    let filteredCustomers = customers;
    if (filter && filter.name) {
      const lowerFilter = filter.name.toLowerCase();
      filteredCustomers = customers.filter((c: Customer) =>
        c.name.toLowerCase().includes(lowerFilter)
      );
    }
    if (filter && filter.sort) {
      filteredCustomers = [...filteredCustomers].sort((a, b) => {
        const { sortBy, dir } = filter.sort;

        if (sortBy === "lastOrder") {
          return dir * (a.lastOrder - b.lastOrder);
        }
        if (sortBy === "lastEdit") {
          return dir * (a.lastEdit - b.lastEdit);
        }
        if (sortBy === "name") {
          return dir * a.name.localeCompare(b.name);
        }
        return 0;
      });
    }

    return _delay(filteredCustomers);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function getById(id: string): Promise<Customer | null> {
  try {
    const customers = loadCustomers();
    const customer = customers.find((c: Customer) => c.id === id) || null;
    if (!customer) {
      return _delay(null);
    }
    const types = await metalTypesService.getQuery();
    const prices = types.reduce((acc, t) => {
      acc[t.type] = 1;
      return acc;
    }, {});
    customer.prices = { ...prices, ...customer.prices };
    return _delay(customer);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function post(customer: Customer): Promise<Customer> {
  const types = await metalTypesService.getQuery();
  const prices = types.reduce((acc, t) => {
    acc[t.type] = 1;
    return acc;
  }, {});
  const cleanCustomer = {
    lastEdit: new Date().getTime(),
    lastOrder: null,
    name: "Default",
    prices: { "Bending price": 1, ...prices },
  };
  try {
    const customers = loadCustomers();
    const newCustomer = {
      ...cleanCustomer,
      ...customer,
      id: makeId(),
    };
    customers.push(newCustomer);
    _saveCustomers(customers);
    return _delay(newCustomer);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function put(updatedCustomer: Customer): Promise<Customer> {
  try {
    const customers = loadCustomers();
    const idx = customers.findIndex(
      (c: Customer) => c.id === updatedCustomer.id
    );
    if (idx === -1) return _delay(null);

    customers[idx] = updatedCustomer;
    _saveCustomers(customers);
    return _delay(updatedCustomer);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function deleteById(id: string) {
  try {
    let customers = loadCustomers();
    const customer = customers.find((c: Customer) => c.id === id);

    if (customer && customer.isUnchangeable) {
      return _delay(false);
    }

    customers = customers.filter((c: Customer) => c.id !== id);
    _saveCustomers(customers);

    return _delay(true);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function loadCustomers(): Customer[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : customers;
}

function _delay<T>(result): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(result), DELAY));
}

function _saveCustomers(customers: Customer[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(customers));
}

export function makeId(length = 10) {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let id = "";
  for (let i = 0; i < length; i++) {
    const idx = Math.floor(Math.random() * chars.length);
    id += chars[idx];
  }
  return id;
}
