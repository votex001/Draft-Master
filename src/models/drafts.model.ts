export interface Draft {
  customerName: string;
  customerId: string;
  metals: {
    name: string;
    type: string;
    paymentPerBending: number;
    metalThickness: number;
    metalPrice: number;
    amount: number;
    width: number;
    price: number;
    deployment: number;
    bendings: { bendingNum: number; width: number }[];
  }[];
  totalPrice: number;
}
