import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  categorySub:Subscription | undefined;
  leatedId:string='best';
  productList: Product[]=[];
  leatestProds: Product[]=[];
  categoryProds:Product[]=[];
  cats:string[] = ['smartphones','furniture','automotive','womens-dresses'];
  constructor(private productService: ProductService,private router:Router) {
    this.productSub= productService.getProducts(9).subscribe(res=>{this.productList=res.products;
    });
    this.leatest('best');
    this.cats.forEach(cat=>productService.getProductsByCategory(cat,1)
    .subscribe(res=>this.categoryProds.push(res.products[0])))
   }

  ngOnDestroy(): void {
    this.productSub?.unsubscribe();
    this.leatestSub?.unsubscribe();
    this.categorySub?.unsubscribe();
  }

  leatest(id:string): void {
    let skip:number=0;
    switch(id){
      case 'best':skip=10;break;
      case 'new' :skip=20;break;
      case 'featured':skip=30;break;
      case 'special':skip=40;break;
    }
    this.leatestSub=this.productService.getProducts(6,skip).subscribe(
      res=>{this.leatestProds=res.products}
    );
    this.leatedId=id;
  }

  goToProductDetails(product:Product):void {
    this.router.navigateByUrl(`/product/${product.id}`,{state:{product:JSON.stringify(product)}})
  }

}
