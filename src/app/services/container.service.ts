import { Party } from './../models/party.model';
import { Container } from './../models/container.model';
import { Result } from './../models/result.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContainerService {
  endpoint = 'http://localhost:3000';
  x: Result;
  constructor(private http: HttpClient) { }

  async getContainers() {
    try {
      return await this.http.get(`${this.endpoint}/containers`).toPromise();
    } catch (e) {
      return null;
    }
  }

  async deleteContainer(id: number) {
    try {
      this.x = await this.http.delete(`${this.endpoint}/containers/${id}`).toPromise() as Result;
      console.log('delete', this.x.error);
      return this.x.data;
    } catch (e) {
      return false;
    }
  }

  async addEditContainer(container: Container, parties: Party[]) {
    try {
      if (container.id === 0) {
        this.x = await this.http.post(`${this.endpoint}/containers`, { container, parties }).toPromise() as Result;
      } else {
        this.x = await this.http.post(`${this.endpoint}/containers/edit/${container.id}`, { container }).toPromise() as Result;
      }
      console.log('add', this.x.data);
      return this.x.data;
    } catch (e) {
      return false;
    }
  }

  async getPartyPrice(party_id: number) {
    try {
      return await this.http.get(`${this.endpoint}/parties/prices/${party_id}`).toPromise();
    } catch (e) {
      return null;
    }
  }

  async updatePrice(id: number, rate: number) {
    try {
      this.x = await this.http.post(`${this.endpoint}/parties/prices/edit/${id}`, {rate}).toPromise() as Result;
      return this.x.data;
    } catch (e) {
      return null;
    }
  }
}
