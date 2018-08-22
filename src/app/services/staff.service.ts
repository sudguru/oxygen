import { Staff } from './../models/staff.model';
import { Result } from './../models/result.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  endpoint = 'http://localhost:3000';
  x: Result;

  constructor(private http: HttpClient) { }

  async getStaffs(party_id: number) {
    try {
      return await this.http.get(`${this.endpoint}/staffs/${party_id}`).toPromise();
    } catch (e) {
      return null;
    }
  }

  async updateStaff(staff: Staff) {
    try {
      this.x = await this.http.post(`${this.endpoint}/staffs/edit/${staff.id}`, {staff}).toPromise() as Result;
      return this.x.data;
    } catch (e) {
      return null;
    }
  }

  async addStaff(staff: Staff) {
    try {
      this.x = await this.http.post(`${this.endpoint}/staffs`, {staff}).toPromise() as Result;
      return this.x.data;
    } catch (e) {
      return null;
    }
  }

  async deleteStaff(id: number) {
    try {
      this.x = await this.http.delete(`${this.endpoint}/staffs/${id}`).toPromise() as Result;
      console.log('delete', this.x.data);
      return this.x.data;
    } catch (e) {
      return false;
    }
  }
}
