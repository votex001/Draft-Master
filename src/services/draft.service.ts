import { Bending } from "@/models/drafts.model";

export const draftService = {
  getMetalSummary,
  getTotalPriceFromMetals,
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
