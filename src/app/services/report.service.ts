import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ReportService extends BaseService {

  constructor(private _router: Router, private _messageService: MessageService) {
    super(_router,_messageService);
    this.apiController = 'api/Report';
  }

  getMyReports(index: number, count: number, status: any, type: any) {
    status = status !== -1 ? status : null;
    var info = JSON.parse(sessionStorage.getItem('info') || '{}');
    return this.BaseAPIConfig.get(`${this.apiController}/getMyReports`, {
      params: { index, count, type, status, reporterId: info.id }
    });
  }

  getAdminReports(index: number, count: number, status: any, type: any) {
    status = status !== -1 ? status : null;
    return this.BaseAPIConfig.get(`${this.apiController}/getAdminReports`, {
      params: { index, count, type, status }
    });
  }


  adminUpdateReport(reportId: string, status: any, reply: string) {
    return this.BaseAPIConfig.post(`${this.apiController}/adminUpdate`, { id: reportId, status: status, reply: reply, note: '' })
  }

}
