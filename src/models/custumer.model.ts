export interface Customer {
  id: string;
  name: string;
  isUnchangeable?: boolean;
  prices: { [key: string]: number };
  lastOrder: number | null;
  lastEdit: number | null;
}
