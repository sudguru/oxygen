import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Result } from '../models/result.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  endpoint = 'http://localhost:3000';
  x: Result;
  constructor(private http: HttpClient) { }

  getProducts(): Observable<Result> {
      return this.http.get(`${this.endpoint}/products`) as Observable<Result>;
  }

  async deleteProduct(id: number) {
    try {
      this.x = await this.http.delete(`${this.endpoint}/products/${id}`).toPromise() as Result;
      console.log('x', this.x.data);
      return this.x.data;
    } catch (e) {
      return false;
    }
  }
}
