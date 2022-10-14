import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { DetailsComponent } from './components/details/details.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { ShopComponent } from './components/shop/shop.component';

const routes: Routes = [
  {path:'home',component: HomeComponent},
  {path:'',pathMatch:'full',redirectTo:'home'},
  {path:'about-us',component:AboutUsComponent},
  {path:'product/:id',component:DetailsComponent},
  {path:'shop',component:ShopComponent},
  {path:'**',component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration:'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
