import { metalTypes } from "./test.data";
import { MetalType } from "@/models/metal.model";
import { makeId } from "./customer.services";
const STORAGE_KEY = "metalTypes";
const DELAY = 500;

export const metalTypesService = {
  getQuery,
  getById,
  saveMetalType,
  deleteById,
};

async function getQuery({
  dir = 1,
  name,
}: {
  dir?: 1 | -1;
  name?: string;
}): Promise<MetalType[]> {
  try {
    const metalTypes = loadMetalTypes();

    let filteredMetalTypes = metalTypes;
    if (name) {
      const lowerFilter = name.toLowerCase();
      filteredMetalTypes = metalTypes.filter((c: MetalType) =>
        c.type.toLowerCase().includes(lowerFilter)
      );
    }

    filteredMetalTypes = filteredMetalTypes.sort((a, b) => {
      return dir * a.type.localeCompare(b.type);
    });

    return _delay(filteredMetalTypes);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function getById(id: string): Promise<MetalType | null> {
  try {
    const metalTypes = loadMetalTypes();
    const metalType = metalTypes.find((c: MetalType) => c.id === id) || null;
    return _delay(metalType);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function saveMetalType(metalType: MetalType): Promise<MetalType> {
  try {
    const metalTypes = loadMetalTypes();
    if (metalType.id) {
      const idx = metalTypes.findIndex((c: MetalType) => c.id === metalType.id);
      if (idx === -1) return _delay(null);

      metalTypes[idx] = metalType;
      _saveMetalTypes(metalTypes);
    } else {
      metalType.id = makeId();
      metalTypes.push(metalType);
      _saveMetalTypes(metalTypes);
    }
    return _delay(metalType);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function deleteById(id: string) {
  try {
    let metalTypes = loadMetalTypes();
    const metalType = metalTypes.find((c: MetalType) => c.id === id);

    if (metalType && metalType.isUnchangeable) {
      return _delay(false);
    }

    metalTypes = metalTypes.filter((c: MetalType) => c.id !== id);
    _saveMetalTypes(metalTypes);

    return _delay(true);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function loadMetalTypes(): MetalType[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : metalTypes;
}

function _delay<T>(result: any): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(result), DELAY));
}

function _saveMetalTypes(metalType: MetalType[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(metalType));
}
