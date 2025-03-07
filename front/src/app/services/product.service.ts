import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ProductAPI, ProductDto } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/products';

  constructor(
    private http: HttpClient
  ) { }

  createProduct(product: ProductDto): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  getProducts(): Observable<ProductAPI[]> {
    return this.http.get<ProductAPI[]>(this.apiUrl);
  }

  getProductsCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count/a`)
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  updateProduct(id: number, product: ProductDto): Observable<Product> {
    return this.http.patch<Product>(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
