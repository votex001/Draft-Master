import { Customer } from "@/models/custumer.model";
import { MetalType } from "@/models/metal.model";
import { makeId } from "./customer.services";

export const customers: Customer[] = [
  {
    id: makeId(),
    name: "Default",
    isUnchangeable: true,
    prices: {
      "Painted 0.4-1": 1,
      "Galvanized 0.4-1": 1,
      "Galvanized 1-4": 1,
    },
    lastOrder: null,
    lastEdit: null,
  },
  {
    id: makeId(),
    name: "John Smith",
    prices: {
      "Painted 0.4-1": 3.2,
      "Galvanized 0.4-1": 7.6,
      "Galvanized 1-4": 4.1,
    },
    lastOrder: Math.floor(Math.random() * 1000000000000),
    lastEdit: Math.floor(Math.random() * 1000000000000),
  },
  {
    id: makeId(),
    name: "Emma Johnson",
    prices: {
      "Painted 0.4-1": 9.9,
      "Galvanized 0.4-1": 2.3,
      "Galvanized 1-4": 8.7,
    },
    lastOrder: Math.floor(Math.random() * 1000000000000),
    lastEdit: Math.floor(Math.random() * 1000000000000),
  },
  {
    id: makeId(),
    name: "Olivia Davis",
    prices: {
      "Painted 0.4-1": 5.4,
      "Galvanized 0.4-1": 1.2,
      "Galvanized 1-4": 6.9,
    },
    lastOrder: Math.floor(Math.random() * 1000000000000),
    lastEdit: Math.floor(Math.random() * 1000000000000),
  },
  {
    id: makeId(),
    name: "Michael Brown",
    prices: {
      "Painted 0.4-1": 7.1,
      "Galvanized 0.4-1": 3.8,
      "Galvanized 1-4": 2.6,
    },
    lastOrder: Math.floor(Math.random() * 1000000000000),
    lastEdit: Math.floor(Math.random() * 1000000000000),
  },
  {
    id: makeId(),
    name: "Sophia Wilson",
    prices: {
      "Painted 0.4-1": 0.5,
      "Galvanized 0.4-1": 6.3,
      "Galvanized 1-4": 5.5,
    },
    lastOrder: Math.floor(Math.random() * 1000000000000),
    lastEdit: Math.floor(Math.random() * 1000000000000),
  },
  {
    id: "9d39b3ce-1c8d-46f5-8e96-7e20f10d1906",
    name: "James Miller",
    prices: {
      "Painted 0.4-1": 4.4,
      "Galvanized 0.4-1": 8.8,
      "Galvanized 1-4": 0.9,
    },
    lastOrder: Math.floor(Math.random() * 1000000000000),
    lastEdit: Math.floor(Math.random() * 1000000000000),
  },
  {
    id: makeId(),
    name: "Isabella Martinez",
    prices: {
      "Painted 0.4-1": 9.1,
      "Galvanized 0.4-1": 2.2,
      "Galvanized 1-4": 7.3,
    },
    lastOrder: Math.floor(Math.random() * 1000000000000),
    lastEdit: Math.floor(Math.random() * 1000000000000),
  },
  {
    id: makeId(),
    name: "William Anderson",
    prices: {
      "Painted 0.4-1": 1.9,
      "Galvanized 0.4-1": 9.7,
      "Galvanized 1-4": 3.0,
    },
    lastOrder: Math.floor(Math.random() * 1000000000000),
    lastEdit: Math.floor(Math.random() * 1000000000000),
  },
  {
    id: makeId(),
    name: "Mia Taylor",
    prices: {
      "Painted 0.4-1": 6.5,
      "Galvanized 0.4-1": 4.6,
      "Galvanized 1-4": 1.1,
    },
    lastOrder: Math.floor(Math.random() * 1000000000000),
    lastEdit: Math.floor(Math.random() * 1000000000000),
  },
  {
    id: makeId(),
    name: "Eugene Sagas",
    prices: {
      "Painted 0.4-1": 6.5,
      "Galvanized 0.4-1": 4.6,
      "Galvanized 1-4": 1.1,
    },
    lastOrder: Math.floor(Math.random() * 1000000000000),
    lastEdit: Math.floor(Math.random() * 1000000000000),
  },
];

export const metals = [
  { id: makeId(), isUnchangeable: true, name: "Default" },
  { id: makeId(), name: "Aluminum" },
  { id: makeId(), name: "Steel" },
  { id: makeId(), name: "Copper" },
  { id: makeId(), name: "Brass" },
  { id: makeId(), name: "Titanium" },
  { id: makeId(), name: "Zinc" },
  { id: makeId(), name: "Iron" },
  { id: makeId(), name: "Nickel" },
  { id: makeId(), name: "Bronze" },
  { id: makeId(), name: "Stainless Steel" },
];

export const metalTypes: MetalType[] = [
  {
    id: makeId(),
    type: "Default",
    isUnchangeable: true,
    paymentPerBending: false,
  },
  { id: makeId(), type: "Painted 0.4-1", paymentPerBending: true },
  { id: makeId(), type: "Galvanized 0.4-1", paymentPerBending: true },
  { id: makeId(), type: "Galvanized 1-4", paymentPerBending: false },
  { id: makeId(), type: "Aluminum 0.4-1", paymentPerBending: false },
];
