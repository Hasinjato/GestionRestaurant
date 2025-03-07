import { Component, Input, OnInit } from '@angular/core';
import { CurrencyPipe, DatePipe, NgFor } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { error } from 'console';
import { NavigationEnd, NavigationStart, Router, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product, ProductDto } from '../../models/product';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [HttpClientModule, DatePipe, CurrencyPipe, RouterModule, NgbModule, ReactiveFormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  produits!: Product[];
  produit!: Product;
  productForm!: FormGroup;

  constructor(
    private productService: ProductService,
    private router: Router,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {
    this.productForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required]],
      prix: ['', [Validators.required, Validators.min(0)]],
      quantiteEnStock: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    this.loadProducts();
  }


  loadProducts(): void {
    const prodObserver = {
      next: (products: Product[]) => {
        this.produits = products;
      },
      error: (error: any) => {
        console.error('Error lors de la récup des prods ', error);
      },
      complete: () => {
      },
    };

    this.productService.getProducts().subscribe(prodObserver);
  }

  loadProductById(id: number): void {
    const prodObserver = {
      next: (products: Product) => {
        this.produit = products;
        this.productForm.patchValue(products)
      },
      error: (error: any) => {
        console.error('Error lors de la récup des prods ', error);
      }
    };
    this.productService.getProductById(id).subscribe(prodObserver);
  }

  isEditPage(): boolean {
    return this.router.url.includes('edit-product');
  }

  editMe(prod_id: number, content: any) {
    this.loadProductById(prod_id);
    this.modalService.open(content);
  }

  submitEdit(): void {
    if (this.productForm.valid) {
      const updatedProd: ProductDto = {
        ...this.productForm.value
      };

      this.productService.updateProduct(this.produit.id, updatedProd).subscribe(() => {
        this.modalService.dismissAll();
        this.router.navigate(['/home'], { fragment: 'produits' });
      })
    } else {
      console.log('Formulaire invalide');
    }
  }

}