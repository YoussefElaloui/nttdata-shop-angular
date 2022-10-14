import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit,OnDestroy {
  product: Product={
    id: 0,
    title: '',
    description: '',
    price: 0,
    discountPercentage: 0,
    rating: 0,
    stock: 0,
    brand: '',
    category: '',
    thumbnail: '',
    images: []
  };
  relatedList:Product[]=[];
  productSub:Subscription|undefined;
  productServiceSub:Subscription|undefined;
  relatedSub:Subscription|undefined;
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router:Router
  ) { }
  ngOnDestroy(): void {
    this.productSub?.unsubscribe();
    this.productServiceSub?.unsubscribe();
    this.relatedSub?.unsubscribe();
  }

  getFromAPI(id:number):void{
    this.productServiceSub= this.productService.getProduct(id)
        .subscribe(res=>this.product=res)
  }

  ngOnInit(): void {
    this.productSub=this.activatedRoute.paramMap.subscribe((res:any)=>{
      if(window.history.state.product){
        this.product=JSON.parse(window.history.state.product);
        if(this.product.id!=res.params.id){
          this.getFromAPI(res.params.id);
        }
      }else{
        this.getFromAPI(res.params.id);
      }
    })
    this.relatedSub=this.productService.getProductsByCategory(this.product.category,4)
    .subscribe(res=>this.relatedList=res.products);
  }

  floor(n:number):number {
    return Math.floor(n);
  }

  goToProductDetails(product:Product):void {
    this.router.navigateByUrl(`/product/${product.id}`,{state:{product:JSON.stringify(product)}})
  }
}
