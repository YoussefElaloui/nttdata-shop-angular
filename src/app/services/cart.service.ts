import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../interfaces/cart.interface';

const CART_KEY="user-cart";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private httpClient: HttpClient
  ) { }
  setCart(cart:Cart):void{
    window.sessionStorage.removeItem(CART_KEY);
    window.sessionStorage.setItem(CART_KEY,JSON.stringify(cart));
  }
  getCart():Cart|null{
    let c:string|null=window.sessionStorage.getItem(CART_KEY)
    if(c) return JSON.parse(c);
    return null;
  }

  getUserCart(id:number):Observable<any>{
    return this.httpClient.get<any>(`https://dummyjson.com/carts/user/${id}`);
  }
  clearCart():void{
    window.sessionStorage.clear();
  }

}
