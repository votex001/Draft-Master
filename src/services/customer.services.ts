import { Customer } from "@/models/custumer.model";
import { costumers } from "./test.data";
const STORAGE_KEY = "customers";
const DELAY = 500;

export const customerService = { getQuery, getById, post, put, deleteById };

async function getQuery(filter = ""): Promise<Customer[]> {
  try {
    const customers = loadCustomers();
    if (!filter) return customers;
    const lowerFiter = filter.toLowerCase();
    const filteredCostumers = customers.filter((c: Customer) =>
      c.name.toLowerCase().includes(lowerFiter)
    );
    return _delay(filteredCostumers);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function getById(id: string): Promise<Customer | null> {
  try {
    const customers = loadCustomers();
    const customer = customers.find((c: Customer) => c.id === id) || null;
    return _delay(customer);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function post(customer: Customer): Promise<Customer> {
  try {
    const customers = loadCustomers();
    const newCustomer = {
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
    const customer = costumers.find((c: Customer) => c.id === id);

    if (customer && customer.isUnchangeable) {
      return _delay(false);
    }
    customers.filter((c: Customer) => c.id !== id);
    _saveCustomers(customers);

    return _delay(true);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function loadCustomers(): Customer[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : costumers;
}

function _delay<T>(result): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(result), DELAY));
}

function _saveCustomers(customers) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(customers));
}

function makeId(length = 10) {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let id = "";
  for (let i = 0; i < length; i++) {
    const idx = Math.floor(Math.random() * chars.length);
    id += chars[idx];
  }
  return id;
}
