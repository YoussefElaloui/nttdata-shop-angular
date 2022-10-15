import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/interfaces/product.interface';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { TokinStorageService } from 'src/app/services/tokin-storage.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  product: Product = {
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
    images: [],
  };
  relatedList: Product[] = [];
  productSub: Subscription | undefined;
  productServiceSub: Subscription | undefined;
  relatedSub: Subscription | undefined;
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private tokenService: TokinStorageService,
    private router: Router
  ) {}
  ngOnDestroy(): void {
    this.productSub?.unsubscribe();
    this.productServiceSub?.unsubscribe();
    this.relatedSub?.unsubscribe();
  }

  getFromAPI(id: number): void {
    this.productServiceSub = this.productService
      .getProduct(id)
      .subscribe((res) => (this.product = res));
  }

  ngOnInit(): void {
    this.productSub = this.activatedRoute.paramMap.subscribe((res: any) => {
      if (window.history.state.product) {
        this.product = JSON.parse(window.history.state.product);
        if (this.product.id != res.params.id) {
          this.getFromAPI(res.params.id);
        }
      } else {
        this.getFromAPI(res.params.id);
      }
    });
    this.relatedSub = this.productService
      .getProductsByCategory(this.product.category, 4)
      .subscribe((res) => (this.relatedList = res.products));
  }

  floor(n: number): number {
    return Math.floor(n);
  }

  goToProductDetails(product: Product): void {
    this.router.navigateByUrl(`/product/${product.id}`, {
      state: { product: JSON.stringify(product) },
    });
  }

  addToCart(product: Product): void {
    let cart = this.cartService.getCart();
    if (cart) {
      cart.products.push({
        id: product.id,
        title: product.title,
        price:
          product.price + (product.price * product.discountPercentage) / 100,
        discountPercentage: product.discountPercentage,
        quantity: 1,
        thumbnail: product.thumbnail,
        total: product.price,
        discountedPrice: product.price,
      });
      cart.total += product.price;
      cart.totalProducts += 1;
      cart.totalQuantity += 1;
    } else {
      cart = {
        id: 9001,
        discountedTotal: 1,
        total: product.price,
        totalProducts: 1,
        totalQuantity: 1,
        userId: -1,
        products: [
          {
            id: product.id,
            title: product.title,
            price:
              product.price +
              (product.price * product.discountPercentage) / 100,
            discountPercentage: product.discountPercentage,
            quantity: 1,
            thumbnail: product.thumbnail,
            total: product.price,
            discountedPrice: product.price,
          },
        ],
      };
    }
    this.cartService.setCart(cart);
    this.router.navigateByUrl('/cart');
  }
}
