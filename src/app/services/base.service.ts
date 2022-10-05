import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  BaseAPIConfig: any;

  apiController: string;

  constructor(private router: Router, private messageService: MessageService) {
    this.apiController = '';
    this.BaseAPIConfig = axios.create({
      baseURL: "https://infrastructure-management.herokuapp.com/"
    });

    this.BaseAPIConfig.interceptors.request.use((config: any) => {
      config.headers = {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token"),
      }
      return config;
    }, (error: any) => {
      return Promise.reject(error)
    });

    this.BaseAPIConfig.interceptors.response.use((res: any) => {
      return res;
    }, (error: any) => {
      if (this.router.url !== '/login' && error.response.status == 401) {
        this.messageService.add({ key: "toastUserView", severity: 'error', summary: "UNAUTHORIZED", detail: "Phiên đăng nhập không hợp lệ. Vui lòng đăng nhập lại!" });
        this.router.navigate(['/login']);
      }
      return Promise.reject(error)
    })
  }

  add(body: any): any {
    return this.BaseAPIConfig.post(`${this.apiController}`, body);
  }

  update(body: any) {
    return this.BaseAPIConfig.put(`${this.apiController}`, body);
  }

  delete(id: string) {
    return this.BaseAPIConfig.delete(`${this.apiController}/${id}`);
  }

  getById(id: string) {
    return this.BaseAPIConfig.get(`${this.apiController}/${id}`);
  }

  getList() {
    return this.BaseAPIConfig.get(`${this.apiController}`);
  }

}
