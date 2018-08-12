import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  endpoint = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  async getProducts() {
    try {
      return await this.http.get(`${this.endpoint}/products`).toPromise();
    } catch (e) {
      return false;
    }
  }

  async deleteProduct(id: number) {
    try {
      await this.http.delete(`${this.endpoint}/products/${id}`);
      return true;
    } catch (e) {
      return false;
    }
  }
}
