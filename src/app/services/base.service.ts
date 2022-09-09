import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  BaseAPIConfig: any;

  apiController: string;

  constructor() {
    this.apiController = '';
    this.BaseAPIConfig = axios.create({
      baseURL: "https://localhost:7033/"
    });
  }

  add(body: any): any {
    return this.BaseAPIConfig.post(`${this.apiController}`, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token"),
      }
    });
  }

  update(body: any) {
    return this.BaseAPIConfig.put(`${this.apiController}`, body, {
      headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("token"),
      }
  });
  }

  delete(id: string) {
    return this.BaseAPIConfig.delete(`${this.apiController}/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token"),
      }
    });
  }

  getById(id: string) {
    return this.BaseAPIConfig.get(`${this.apiController}/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token"),
      }
    });
  }

  getList() {
    return this.BaseAPIConfig.get(`${this.apiController}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token"),
      }
    });
  }

}
