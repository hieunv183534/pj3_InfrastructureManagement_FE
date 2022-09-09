import { BaseService } from './base.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  constructor() {
    super();
    this.apiController = 'api/Account';
  }

  login(body:any) {
    return this.BaseAPIConfig.post(`${this.apiController}/login`, body);
  }

  signup(acc: any) {
    return this.BaseAPIConfig.post(`${this.apiController}/signup`, { ...acc, role: 'reporter' });
  }

  logout() {
    return this.BaseAPIConfig.post(`${this.apiController}/logout`, {}, {
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token"),
      }
    });
  }

}
