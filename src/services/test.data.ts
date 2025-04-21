import { Customer } from "@/models/custumer.model";
import { MetalType } from "@/models/metal.model";

export const customers: Customer[] = [
  {
    id: "xJ6aLxP9sZ",
    name: "Default",
    isUnchangeable: true,
    prices: {
      "Bending price": 1,
      "Painted 0.4-1": 1,
      "Galvanized 0.4-1": 1,
      "Galvanized 1-4": 1,
    },
    lastOrder: null,
    lastEdit: null,
  },
  {
    id: "Q9xg4M2pWh",
    name: "John Smith",
    prices: {
      "Bending price": 4.3,
      "Painted 0.4-1": 3.2,
      "Galvanized 0.4-1": 7.6,
      "Galvanized 1-4": 4.1,
    },
    lastOrder: 823431972153,
    lastEdit: 342498435092,
  },
  {
    id: "GdX4zJkE2R",
    name: "Emma Johnson",
    prices: {
      "Bending price": 2.5,
      "Painted 0.4-1": 9.9,
      "Galvanized 0.4-1": 2.3,
      "Galvanized 1-4": 8.7,
    },
    lastOrder: 682394782173,
    lastEdit: 239847129378,
  },
  {
    id: "ZkLm3W0xYT",
    name: "Olivia Davis",
    prices: {
      "Bending price": 3.8,
      "Painted 0.4-1": 5.4,
      "Galvanized 0.4-1": 1.2,
      "Galvanized 1-4": 6.9,
    },
    lastOrder: 492738471923,
    lastEdit: 981273498123,
  },
  {
    id: "BvQ2MnYxF8",
    name: "Michael Brown",
    prices: {
      "Bending price": 7.2,
      "Painted 0.4-1": 7.1,
      "Galvanized 0.4-1": 3.8,
      "Galvanized 1-4": 2.6,
    },
    lastOrder: 321934871237,
    lastEdit: 948217349812,
  },
  {
    id: "NcW5eOzR1K",
    name: "Sophia Wilson",
    prices: {
      "Bending price": 5.7,
      "Painted 0.4-1": 0.5,
      "Galvanized 0.4-1": 6.3,
      "Galvanized 1-4": 5.5,
    },
    lastOrder: 792134781273,
    lastEdit: 349812374982,
  },
  {
    id: "9d39b3ce-1c8d-46f5-8e96-7e20f10d1906",
    name: "James Miller",
    prices: {
      "Bending price": 6.1,
      "Painted 0.4-1": 4.4,
      "Galvanized 0.4-1": 8.8,
      "Galvanized 1-4": 0.9,
    },
    lastOrder: 812374982374,
    lastEdit: 127348912873,
  },
  {
    id: "XqP7bCvW4M",
    name: "Isabella Martinez",
    prices: {
      "Bending price": 1.9,
      "Painted 0.4-1": 9.1,
      "Galvanized 0.4-1": 2.2,
      "Galvanized 1-4": 7.3,
    },
    lastOrder: 974812374982,
    lastEdit: 192837491827,
  },
  {
    id: "FsW8NdCz9T",
    name: "William Anderson",
    prices: {
      "Bending price": 3.6,
      "Painted 0.4-1": 1.9,
      "Galvanized 0.4-1": 9.7,
      "Galvanized 1-4": 3.0,
    },
    lastOrder: 812739128374,
    lastEdit: 492837491823,
  },
  {
    id: "DpR3zBqXL7",
    name: "Mia Taylor",
    prices: {
      "Bending price": 4.9,
      "Painted 0.4-1": 6.5,
      "Galvanized 0.4-1": 4.6,
      "Galvanized 1-4": 1.1,
    },
    lastOrder: 123847129384,
    lastEdit: 897123894712,
  },
  {
    id: "EtY9VxLmP3",
    name: "Eugene Sagas",
    prices: {
      "Bending price": 3.3,
      "Painted 0.4-1": 6.3,
      "Galvanized 0.4-1": 4.2,
      "Galvanized 1-4": 1.7,
    },
    lastOrder: 129384129384,
    lastEdit: 897234982134,
  },
];

export const metals = [
  { id: "XrL4wZp3Bn", isUnchangeable: true, name: "Default" },
  { id: "YwP5cMnR8Q", name: "Aluminum" },
  { id: "TaK3jUyL2D", name: "Steel" },
  { id: "LzE1bFnX9K", name: "Copper" },
  { id: "HwQ7mKrC6Z", name: "Brass" },
  { id: "RtU8oPsJ5N", name: "Titanium" },
  { id: "MuA2zBcQ4L", name: "Zinc" },
  { id: "OjW3vHtY8M", name: "Iron" },
  { id: "KpX6yVrN1S", name: "Nickel" },
  { id: "ZtR9wXqF7E", name: "Bronze" },
  { id: "CmV5uXyP2B", name: "Stainless Steel" },
];

export const metalTypes: MetalType[] = [
  {
    id: "SxM8jLuT4Q",
    type: "Default",
    isUnchangeable: true,
    paymentPerBending: false,
  },
  { id: "AeN1vZrC5K", type: "Painted 0.4-1", paymentPerBending: true },
  { id: "VtX3yWpE9L", type: "Galvanized 0.4-1", paymentPerBending: true },
  { id: "BnW7lKsM2D", type: "Galvanized 1-4", paymentPerBending: false },
  { id: "LuP6zNkF3R", type: "Aluminum 0.4-1", paymentPerBending: false },
];



export const  drawings = [{}]