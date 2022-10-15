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
  productsOrigin: Product[] = [];
  productsFiltered: Product[] = [];
  products: Product[] = [];
  categories: string[] = [];
  page: number = 1;
  sort: string = 'best';
  title: string = 'Shop Grid Default';

  layoutGrid: boolean = true;

  PAGE: number = 12;

  productSub: Subscription | undefined;
  categorySub: Subscription | undefined;

  discount: number[] = [5, 20, 25];
  rating: number[] = [1, 2, 3, 4, 5];
  categoryFilter: string[] = [];
  prices: number[] = [1, 2, 3, 4];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.getProductsFromApi();
    this.categorySub = this.productService.getCategories().subscribe((res) => {
      this.categories = res;
      this.categoryFilter = [...this.categories];
    });
  }
  ngOnDestroy(): void {
    this.productSub?.unsubscribe();
  }

  switchLayout(toList: boolean): void {
    this.layoutGrid = !this.layoutGrid;
    if (toList) this.title = 'Shop Left Sidebar';
    else this.title = 'Shop Grid Default';
  }
  getProductsFromApi() {
    this.productSub = this.productService.getProducts(100).subscribe((res) => {
      this.productsOrigin = res.products;
      this.productsFiltered = res.products;
      this.getProducts(1);
    });
  }
  getProducts(page: number): void {
    this.products = this.productsFiltered.slice(
      this.PAGE * (page - 1),
      this.PAGE * page
    );
    this.sortList();
  }
  resetProductsFiltered(): void {
    this.productsFiltered = this.productsOrigin;
  }

  change() {
    this.getProducts(this.page);
  }
  sortList(): void {
    if (this.sort == 'best')
      this.products = this.products.sort((a, b) => b.rating - a.rating);
    else this.products = this.products.sort((a, b) => a.price - b.price);
  }

  goToProductDetails(product: Product): void {
    this.router.navigateByUrl(`/product/${product.id}`, {
      state: { product: JSON.stringify(product) },
    });
  }
  floor(n: number): number {
    return Math.floor(n);
  }
  filter(): void {
    this.resetProductsFiltered();
    let ps: Product[] = [];
    let temp: Product[] = [];
    if (this.discount.length != 0) {
      if (this.discount.includes(5)) {
        ps = [
          ...ps,
          ...this.productsFiltered.filter((p) => p.discountPercentage < 5),
        ];
      }
      if (this.discount.includes(20)) {
        ps = [
          ...ps,
          ...this.productsFiltered.filter(
            (p) => p.discountPercentage > 5 && p.discountPercentage < 25
          ),
        ];
      }
      if (this.discount.includes(25)) {
        ps = [
          ...ps,
          ...this.productsFiltered.filter((p) => p.discountPercentage >= 25),
        ];
      }
    }

    if (this.rating.length != 0) {
      this.rating.forEach(
        (r) =>
          (temp = [...temp, ...ps.filter((p) => this.floor(p.rating) == r)])
      );
      ps = [...temp];

      temp = [];
    } else ps = [];

    if (this.categoryFilter.length != 0) {
      this.categoryFilter.forEach(
        (c) => (temp = [...temp, ...ps.filter((p) => p.category == c)])
      );
      ps = [...temp];

      temp = [];
    } else ps = [];

    if (this.prices.length != 0) {
      if (this.prices.includes(1))
        temp = [...temp, ...ps.filter((p) => p.price <= 150)];
      if (this.prices.includes(2))
        temp = [...temp, ...ps.filter((p) => p.price > 150 && p.price<=350)];
      if (this.prices.includes(3))
        temp = [...temp, ...ps.filter((p) => p.price > 350 && p.price<=500)];
      if (this.prices.includes(4))
        temp = [...temp, ...ps.filter((p) => p.price > 500)];
      ps=[...temp];
      temp=[];
    } else ps = [];

    this.productsFiltered = ps;

    this.page = 1;
    this.getProducts(this.page);
  }
  fillProducts = (ps: any[], what: number | string): void => {
    if (ps.includes(what)) {
      ps.splice(ps.indexOf(what), 1);
    } else {
      ps.push(what);
    }
  };
  filterCall(who: string, what: number): void {
    if (who == 'discount') {
      this.fillProducts(this.discount, what);
    }
    if (who == 'rating') {
      this.fillProducts(this.rating, what);
    }
    if (who == 'price') this.fillProducts(this.prices, what);
    this.filter();
  }
  filterCallCategory(what: string): void {
    this.fillProducts(this.categoryFilter, what);

    this.filter();
  }
}
