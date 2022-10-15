import { CartProduct } from "./CartProduct.interface"

export interface Cart{
  id: number,
  products: CartProduct[],
  total:number,
  discountedTotal:number,
  userId:number,
  totalProducts:number,
  totalQuantity:number
}
