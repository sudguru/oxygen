import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  endpoint = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  async getProducts() {
    return await this.http.get(`${this.endpoint}/products`).toPromise();
  }
}
