export interface Draft {
  customerName: string;
  customerId: string;
  metals: DraftMetal[];
  totalPrice: number;
}

export interface DraftMetal {
  name: string;
  type: string;
  paymentPerBending: number;
  metalThickness: number;
  metalPrice: number;
  amount: number;
  width: number;
  price: number;
  deployment: number;
  bendings: Bendings[];
  bendingFee: boolean;
}

export interface Bendings {
  bendingNum: number;
  width: number;
}
