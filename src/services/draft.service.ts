import { Bending } from "@/models/drafts.model";
import { makeId } from "./service";
import { Customer } from "@/models/custumer.model";
import { metalService } from "./metal.service";
import { metalTypesService } from "./metal.types.service";
import { Metal, MetalType } from "@/models/metal.model";
import { loadDrafts } from "./drafts.list.service";

export const draftService = {
  getMetalSummary,
  getTotalPriceFromMetals,
  createNewDraftMetal,
  getDraftById,
};

interface metalStats {
  name: string;
  deployment: number;
  amount: number;
  width: number;
  paymentPerBending: number;
  bendings: Bending[];
  metalThickness: number;
  price: number;
  bendingFee: boolean;
}

function getMetalSummary(metalStats: metalStats) {
  const totalArea = (
    metalStats.deployment *
    metalStats.amount *
    metalStats.width
  ).toFixed(2);
  const bendingFee = metalStats.bendingFee
    ? metalStats.paymentPerBending *
      metalStats.bendings.length *
      metalStats.amount
    : 0;

  const weightFee = +(
    metalStats.metalThickness *
    8 *
    metalStats.deployment *
    metalStats.width *
    metalStats.price *
    metalStats.amount
  ).toFixed(2);

  const totalPrice = (weightFee + bendingFee).toFixed(2);
  return {
    name: metalStats.name,
    totalArea,
    bendingFee,
    weightFee,
    totalPrice,
  };
}
function getTotalPriceFromMetals(metals: metalStats[]): number {
  const total = metals.reduce((sum, metal) => {
    const summary = getMetalSummary(metal);
    return sum + parseFloat(summary.totalPrice);
  }, 0);

  return parseFloat(total.toFixed(2));
}

async function createNewDraftMetal(customer: Customer) {
  const defaultMetal: Metal = (
    await metalService.getQuery({
      name: "default",
    })
  )[0];
  const defaultType: MetalType = (
    await metalTypesService.getQuery({
      type: "default",
    })
  )[0];
  return {
    id: makeId(),
    amount: 1,
    bendings: [],
    deployment: 0,
    metalPrice: customer.prices["Default"] | 1,
    name: defaultMetal.name,
    metalId: defaultMetal.id,
    paymentPerBending: customer.prices["Bending price"] | 1,
    price: customer.prices["Default"] | 1,
    type: defaultType.type,
    typeId: defaultType.id,
    width: 3,
    bendingFee: true,
    metalThickness: 0.5,
  };
}

async function getDraftById(id: string) {
  const draftList = await loadDrafts();
  const draft = draftList.find((d) => (d.id = id));
  return draft;
}
