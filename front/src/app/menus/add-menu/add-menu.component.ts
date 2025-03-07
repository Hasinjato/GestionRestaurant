import { NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenuService } from '../../services/menu.service';
import { Router } from '@angular/router';
import { Product } from '../../models/product';
import { MenuDto } from '../../models/menu';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-menu',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule, NgIf, NgbModule],
  templateUrl: './add-menu.component.html',
  styleUrl: './add-menu.component.css'
})
export class AddMenuComponent implements OnInit {
  menuForm: FormGroup;
  produits!: Product[];
  errorMsg!: string;

  constructor(
    private fb: FormBuilder,
    private menuService: MenuService,
    private router: Router,
    private modalService: NgbModal
  ) {
    this.menuForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      produitsQuantites: this.fb.array([])
    });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    this.loadProd();
  }

  loadProd(): void {
    const prodObserver = {
      next: (products: Product[]) => {
        this.produits = products;
      },
      error: (error: any) => {
        console.error('Erreur lors de charg de prod ', error);
      }
    };

    this.menuService.getProducts().subscribe(prodObserver);
  }


  get produitsQuantites() {
    return this.menuForm.get('produitsQuantites') as FormArray;
  }

  addProducts() {
    this.produitsQuantites.push(this.fb.group({
      produitId: ['', Validators.required],
      quantite: [1, [Validators.required, Validators.min(1)]]
    }));
  }

  removeProducts(index: number) {
    this.produitsQuantites.removeAt(index);
  }

  onSubmit(content: any): void {
    if (this.menuForm.valid) {
      const menu: MenuDto = this.menuForm.value;
      this.menuService.createMenu(menu).subscribe({
        next: (res) => {
          this.menuForm.reset();
          this.produitsQuantites.clear();
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.errorMsg = error.error.message;
          this.modalService.open(content);
        }
      });
    } else {
      console.log('Formulaire invalide');
    }
  }

}
