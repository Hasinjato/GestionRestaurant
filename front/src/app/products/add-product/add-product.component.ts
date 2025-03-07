import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { ProductDto } from '../../models/product';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule, NgIf],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required]],
      prix: ['', [Validators.required]],
      quantiteEnStock: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  }
  
  onSubmit(): void {
    if (this.productForm.valid) {
      const products: ProductDto = this.productForm.value;
      this.productService.createProduct(products).subscribe({
        next: (res) => {
          console.log('Produit Ajouter avec succèss ', res);
          this.router.navigate(['/home'])
        },
        error: (error) => {
          console.error('Erreur lors de l ajout ', error);
        }
      });
    } else {
      console.log('Formulaire invalide');
    }
  }
}
