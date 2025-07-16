export interface Draft {
  id?: string;
  draftName: string;
  customerName: string;
  customerId: string;
  metals: DraftMetal[];
  totalPrice: number;
  lastEdit: number;
}

export interface DraftMetal {
  id: string;
  name: string;
  type: string;
  metalId: string;
  typeId: string;
  paymentPerBending: number;
  metalThickness: number;
  metalPrice: number;
  amount: number;
  width: number;
  price: number;
  deployment: number;
  bendings: Bending[];
  bendingFee: boolean;
}

export interface Bending {
  id: string;
  width: number;
}
