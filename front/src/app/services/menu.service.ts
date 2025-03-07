import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuAPI, MenuDto } from '../models/menu';
import { Product, ProductAPI } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private apiUrl = 'http://localhost:3000/menus';
  private productApiUrl = 'http://localhost:3000/products';

  constructor(
    private http: HttpClient
  ) { }

  createMenu(menu: MenuDto): Observable<MenuDto> {
    return this.http.post<MenuDto>(this.apiUrl, menu);
  }

  getProducts(): Observable<ProductAPI[]> {
    return this.http.get<ProductAPI[]>(this.productApiUrl);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.productApiUrl}/${id}`);
  }

  public getMenus(): Observable<MenuAPI[]> {
    return this.http.get<MenuAPI[]>(this.apiUrl);
  }

  getMenusCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count/a`)
  }

  public getMenuById(id: number): Observable<MenuAPI> {
    return this.http.get<MenuAPI>(`${this.apiUrl}/${id}`);
  }

  buyProd(id: number): Observable<{ message: string, menu: MenuAPI }> {
    return this.http.post<{ message: string, menu: any }>(
      `${this.apiUrl}/acheter/${id}`,
      {}
    );
  }

  // deleteProduct(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/${id}`);
  // }
}
