import { Product } from "./product.interface";

export interface Result{
  products:Product[],
  total:number,
  skip:number,
  limit:number,
}
