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

}
