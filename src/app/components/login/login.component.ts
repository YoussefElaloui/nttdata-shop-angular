import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from 'src/app/services/login.service';
import { TokinStorageService } from 'src/app/services/tokin-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  isSucceful: boolean = false;

  loginServiceSub: Subscription | undefined;
  cartSub: Subscription | undefined;

  constructor(
    private loginService: LoginService,
    private tokenService: TokinStorageService,
    private cartService: CartService,
    private router: Router
  ) {}
  ngOnDestroy(): void {
    this.loginServiceSub?.unsubscribe();
  }

  ngOnInit(): void {}

  submit(loginForm: NgForm): void {
    this.loginServiceSub = this.loginService
      .login(loginForm.form.value.email, loginForm.form.value.password)
      .subscribe((res) => {
        this.tokenService.setUser(res);
        this.isSucceful = true;
        this.cartSub = this.cartService.getUserCart(res.id).subscribe((res) => {
          this.cartService.setCart(res.carts[0]);
          this.router.navigateByUrl('').then(() => window.location.reload());
        });
      });
  }
}
