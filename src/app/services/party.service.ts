import { Party } from './../models/party.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Result } from '../models/result.model';

@Injectable({
  providedIn: 'root'
})
export class PartyService {
  endpoint = 'http://localhost:3000';
  x: Result;
  constructor(private http: HttpClient) { }

  async getParties() {
    try {
      return await this.http.get(`${this.endpoint}/parties`).toPromise();
    } catch (e) {
      return null;
    }
  }

  async deleteParty(id: number) {
    try {
      this.x = await this.http.delete(`${this.endpoint}/parties/${id}`).toPromise() as Result;
      console.log('delete', this.x.error);
      return this.x.data;
    } catch (e) {
      return false;
    }
  }

  async addEditParty(party: Party) {
    try {
      if (party.id === 0) {
        this.x = await this.http.post(`${this.endpoint}/parties`, { party }).toPromise() as Result;
      } else {
        this.x = await this.http.post(`${this.endpoint}/parties/edit/${party.id}`, { party }).toPromise() as Result;
      }
      console.log('add', this.x.data);
      return this.x.data;
    } catch (e) {
      return false;
    }
  }

}
