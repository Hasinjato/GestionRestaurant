import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsComponent } from '../products/products/products.component';
import { MenusComponent } from '../menus/menus/menus.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductsComponent, MenusComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private routera: ActivatedRoute
  ) { }

  isEditPage(): boolean {
    return this.router.url.includes('edit-product');
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    this.routera.fragment.subscribe((fragment) => {
      if (fragment) {
        this.scrollToSection(fragment);
      }
    });
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'auto'
      });
    }
  }
}
