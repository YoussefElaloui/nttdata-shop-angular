import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product.interface';
import { Result } from '../interfaces/result.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  getProducts(limit:number,skip:number=0):Observable<Result>{
    return this.httpClient.get<Result>(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
  }
  getProductsByCategory(category:string,limit:number,skip:number=0):Observable<Result>{
    return this.httpClient.get<Result>(`https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`)
  }
  getProduct(id:number):Observable<Product>{
    return this.httpClient.get<Product>(`https://dummyjson.com/products/${id}`);
  }
  getCategories():Observable<string[]>{
    return this.httpClient.get<string[]>('https://dummyjson.com/products/categories');
  }

}
