import { metals } from "./test.data";
import { Metal } from "@/models/metal.model";
import { makeId } from "./customer.services";
const STORAGE_KEY = "metals";
const DELAY = 500;

export const metalService = { getQuery, getById, saveMetal, deleteById };

async function getQuery({
  dir = 1,
  name,
}: {
  dir?: 1 | -1;
  name?: string;
}): Promise<Metal[]> {
  try {
    const customers = loadMetals();

    let filteredMetals = customers;
    if (name) {
      const lowerFilter = name.toLowerCase();
      filteredMetals = customers.filter((c: Metal) =>
        c.name.toLowerCase().includes(lowerFilter)
      );
    }

    filteredMetals = filteredMetals.sort((a, b) => {
      return dir * a.name.localeCompare(b.name);
    });

    return _delay(filteredMetals);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function getById(id: string): Promise<Metal | null> {
  try {
    const metals = loadMetals();
    const metal = metals.find((c: Metal) => c.id === id) || null;
    return _delay(metal);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function saveMetal(metal: Metal): Promise<Metal> {
  try {
    const metals = loadMetals();
    if (metal.id) {
      const idx = metals.findIndex((c: Metal) => c.id === metal.id);
      if (idx === -1) return _delay(null);

      metals[idx] = metal;
      _saveMetals(metals);
    } else {
      metal.id = makeId();
      metals.push(metal);
      _saveMetals(metals);
    }
    return _delay(metal);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function deleteById(id: string) {
  try {
    let metals = loadMetals();
    const metal = metals.find((c: Metal) => c.id === id);

    if (metal && metal.isUnchangeable) {
      return _delay(false);
    }

    metals = metals.filter((c: Metal) => c.id !== id);
    _saveMetals(metals);

    return _delay(true);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function loadMetals(): Metal[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : metals;
}

function _delay<T>(result: any): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(result), DELAY));
}

function _saveMetals(metals: Metal[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(metals));
}
