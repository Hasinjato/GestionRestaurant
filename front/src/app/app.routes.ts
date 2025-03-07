import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { AddMenuComponent } from './menus/add-menu/add-menu.component';
import { ProductsComponent } from './products/products/products.component';

export const routes: Routes = [
    {
        path: '', redirectTo: 'home', pathMatch: 'full'
    },
    {
        path: 'home', component: HomeComponent
    },
    {
        path: 'add-product', component: AddProductComponent
    },
    {
        path: 'edit-product', component: ProductsComponent
    },
    {
        path: 'add-menu', component: AddMenuComponent
    },
];
