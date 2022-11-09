import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ExportExcelService extends BaseService {

  constructor(private _router: Router, private _messageService: MessageService) {
    super(_router,_messageService);
    this.apiController = 'api/ExcelReport';
  }

  getOverView() {
    return this.BaseAPIConfig.get(`${this.apiController}/overview`, {
      responseType: "blob"
    });
  }

  getCategory() {
    return this.BaseAPIConfig.get(`${this.apiController}/category`, {
      responseType: "blob"
    });
  }

  getItem() {
    return this.BaseAPIConfig.get(`${this.apiController}/item`, {
      responseType: "blob"
    });
  }

  getProblem() {
    return this.BaseAPIConfig.get(`${this.apiController}/report`, {
      responseType: "blob"
    });
  }

}
