interface Drawing {
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
  }[];
  totalPrice: number;
}
