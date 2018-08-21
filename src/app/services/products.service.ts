import { Party } from './../models/party.model';
import { Product } from './../models/product.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Result } from '../models/result.model';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  endpoint = 'http://localhost:3000';
  x: Result;
  constructor(private http: HttpClient) { }

  async getProducts() {
    try {
      return await this.http.get(`${this.endpoint}/products`).toPromise();
    } catch (e) {
      return null;
    }
  }

  async deleteProduct(id: number) {
    try {
      this.x = await this.http.delete(`${this.endpoint}/products/${id}`).toPromise() as Result;
      console.log('delete', this.x.data);
      return this.x.data;
    } catch (e) {
      return false;
    }
  }

  async addEditProduct(product: Product, parties: Party[]) {
    try {
      if (product.id === 0) {
        this.x = await this.http.post(`${this.endpoint}/products`, { product, parties }).toPromise() as Result;
      } else {
        this.x = await this.http.post(`${this.endpoint}/products/edit/${product.id}`, { product }).toPromise() as Result;
      }
      console.log('add', this.x.data);
      return this.x.data;
    } catch (e) {
      return false;
    }
  }

}
