import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit, OnDestroy {
  productsOrigin:Product[]=[]
  products: Product[] = [];
  categories:string[] = [];
  page: number = 1;
  sort: string = 'best';
  title:string='Shop Grid Default';

  layoutGrid:boolean = true;

  PAGE: number = 12;

  productSub: Subscription | undefined;
  categorySub: Subscription | undefined;

  constructor(
    private productService: ProductService,
    private router:Router
    ) {}

  ngOnInit(): void {
    this.getProducts(1);
    this.categorySub= this.productService.getCategories()
      .subscribe(res=>this.categories=res)
  }
  ngOnDestroy(): void {
    this.productSub?.unsubscribe();
  }

  switchLayout(toList:boolean): void {
    this.layoutGrid=!this.layoutGrid;
    if(toList) this.title='Shop Left Sidebar'
    else this.title='Shop Grid Default'
  }

  getProducts(page: number): void {
    this.productSub = this.productService
      .getProducts(this.PAGE, this.PAGE * (page - 1))
      .subscribe((res) => {
        this.products = res.products;
        this.sortList();
      });
  }

  change() {
    this.getProducts(this.page);
  }
  sortList(): void {
    if (this.sort == 'best')
      this.products = this.products.sort((a, b) => b.rating - a.rating);
    else this.products = this.products.sort((a, b) => a.price - b.price);
    console.log(this.sort);
    console.log(this.products);
  }


  goToProductDetails(product:Product):void {
    this.router.navigateByUrl(`/product/${product.id}`,{state:{product:JSON.stringify(product)}})
  }
  floor(n:number):number {
    return Math.floor(n);
  }
}
