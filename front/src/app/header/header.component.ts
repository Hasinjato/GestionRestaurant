import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProductService } from '../services/product.service';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, HttpClientModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private menuService: MenuService
  ) { }

  prodsNb!: number;
  menusNb!: number;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    this.loadProdCount();
    this.loadMenuCount();
  }

  loadProdCount(): void {
    this.productService.getProductsCount().subscribe(
      (data) => this.prodsNb = (data)
    )
  }

  loadMenuCount(): void {
    this.menuService.getMenusCount().subscribe(
      (data) => this.menusNb = (data)
    )
  }
}
