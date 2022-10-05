import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  constructor(private _router: Router, private _messageService: MessageService) {
    super(_router,_messageService);
    this.apiController = 'api/Account';
  }

  login(body: any) {
    return this.BaseAPIConfig.post(`${this.apiController}/login`, body);
  }

  signup(acc: any) {
    return this.BaseAPIConfig.post(`${this.apiController}/signup`, { ...acc, role: 'reporter' });
  }

  logout() {
    return this.BaseAPIConfig.post(`${this.apiController}/logout`);
  }

  getOverView() {
    return this.BaseAPIConfig.get(`${this.apiController}/getOverView`);
  }

}
