export interface Metal {
  id?: string;
  name: string;
  isUnchangeable?: boolean;
}
export interface MetalType {
  id?: string;
  type: string;
  isUnchangeable?: boolean;
  paymentPerBending: boolean;
}
export interface WithId {
  id: string;
  [key: string]: any;
}