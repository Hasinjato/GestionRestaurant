import { CurrencyPipe, DatePipe, DecimalPipe, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from '../../services/menu.service';
import { Menu, MenuProduct } from '../../models/menu';
import { NgbModal, NgbModule } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-menus',
  standalone: true,
  imports: [HttpClientModule, DatePipe, DecimalPipe, CurrencyPipe, NgbModule, NgIf],
  templateUrl: './menus.component.html',
  styleUrl: './menus.component.css'
})
export class MenusComponent implements OnInit {

  menus!: Menu[];
  menuu!: Menu;
  mess!: string;
  errorMess!: string;

  menuProduits!: MenuProduct[];

  @Input()
  menu!: Menu;

  isLoaded: boolean = false;

  constructor(
    private menuService: MenuService,
    private router: Router,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    this.loadMenus();
  }

  loadMenus(): void {
    this.menuService.getMenus().subscribe(
      (data) => {
        this.menus = (data);
        this.isLoaded = true;
      }
    )
  }


  acheter(id: number, content: any) {
    this.menuService.buyProd(id).subscribe({
      next: (res) => {
        this.errorMess = '';
        this.modalService.open(content);
        this.mess = res.message;
        this.menuu = res.menu;
      },
      error: (error) => {
        this.errorMess = error.error.message;
        this.modalService.open(content);
      }
    });
  }
}
