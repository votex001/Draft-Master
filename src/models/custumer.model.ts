export interface Customer {
  id: string;
  name: string;
  isChangible?: boolean;
  prices: { [key: string]: number };
}

