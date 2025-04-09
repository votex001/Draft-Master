export interface Metal {
  id: string;
  name: string;
  isUnchangeable?:true
}
export interface MetalType {
  id: string;
  type: string;
  isUnchangeable?:true
  paymentPerBending: boolean;
}
