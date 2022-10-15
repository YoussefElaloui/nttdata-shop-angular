import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cart } from 'src/app/interfaces/cart.interface';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { TokinStorageService } from 'src/app/services/tokin-storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit,OnDestroy {

  cart: Cart| null=null;
  productSub:Subscription | undefined;
  constructor(
    private cartService: CartService,
    private productService: ProductService
  ) { }
  ngOnDestroy(): void {
    this.productSub?.unsubscribe();
  }

  ngOnInit(): void {
    this.cart=this.cartService.getCart();
    // some code to get cart's products thumbnails because they are not available in api by default
    this.productService.getProducts(100)
    .subscribe(res=>{
      this.cart?.products.forEach(p=>{
        p.thumbnail= res.products.find(f=>f.id==p.id)?.thumbnail;
      })
    })

  }

  clear(){
    this.cartService.clearCart();
    this.cart=null;
  }

}
