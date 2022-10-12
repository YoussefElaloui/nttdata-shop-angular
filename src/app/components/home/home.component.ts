import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnDestroy {

  productSub:Subscription | undefined;
  leatestSub:Subscription | undefined;
  leatedId:string='best';
  productList: Product[]=[];
  leatestProds: Product[]=[];
  constructor(private productService: ProductService) {
    this.productSub= productService.getProducts(5).subscribe(res=>{this.productList=res.products;
    });
    this.leatest('best');
   }

  ngOnDestroy(): void {
    this.productSub?.unsubscribe();
    this.leatestSub?.unsubscribe();
  }

  leatest(id:string): void {
    let skip:number =Math.random()*35+3;
    this.leatestSub=this.productService.getProducts(6,skip).subscribe(
      res=>{console.log(res)
      ;this.leatestProds=res.products}
    );
    this.leatedId=id;
  }


}
