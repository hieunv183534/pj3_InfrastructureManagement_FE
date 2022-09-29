import { BaseService } from './base.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportService extends BaseService {

  constructor() {
    super();
    this.apiController = 'api/Report';
  }

  getMyReports(index: number, count: number, status: any, type: any) {
    let _status = status !== -1 ? `&status=${status}` : '';
    var info = JSON.parse(sessionStorage.getItem('info') || '{}');
    return this.BaseAPIConfig.get(`${this.apiController}/getMyReports?index=${index}&count=${count}&type=${type}${_status}&reporterId=${info.id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token"),
      }
    });
  }

  getAdminReports(index: number, count: number, status: any, type: any) {
    let _status = status !== -1 ? `&status=${status}` : '';
    return this.BaseAPIConfig.get(`${this.apiController}/getAdminReports?index=${index}&count=${count}&type=${type}${_status}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token"),
      }
    });
  }


  adminUpdateReport(reportId: string, status: any, reply: string) {
    return this.BaseAPIConfig.post(`${this.apiController}/adminUpdate`, { id: reportId, status: status, reply: reply, note: '' }, {
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token"),
      }
    })
  }

}
