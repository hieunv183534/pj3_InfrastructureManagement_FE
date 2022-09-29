import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ExportExcelService extends BaseService {

  constructor() {
    super();
    this.apiController = 'api/ExcelReport';
  }

  getOverView() {
    return this.BaseAPIConfig.get(`${this.apiController}/overview`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token"),
      },
      responseType: "blob"
    });
  }

  getCategory() {
    return this.BaseAPIConfig.get(`${this.apiController}/category`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token"),
      },
      responseType: "blob"
    });
  }

  getItem() {
    return this.BaseAPIConfig.get(`${this.apiController}/item`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token"),
      },
      responseType: "blob"
    });
  }

  getProblem() {
    return this.BaseAPIConfig.get(`${this.apiController}/report`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token"),
      },
      responseType: "blob"
    });
  }

}
