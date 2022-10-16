import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { HomeHeroComponent } from './components/home-hero/home-hero.component';
import { ErrorComponent } from './components/error/error.component';
import { HeroComponent } from './components/hero/hero.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { DetailsComponent } from './components/details/details.component';
import { ShopComponent } from './components/shop/shop.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderCompletedComponent } from './components/order-completed/order-completed.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { FaqComponent } from './components/faq/faq.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    HomeHeroComponent,
    ErrorComponent,
    HeroComponent,
    AboutUsComponent,
    DetailsComponent,
    ShopComponent,
    LoginComponent,
    CartComponent,
    OrderCompletedComponent,
    ContactUsComponent,
    FaqComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
