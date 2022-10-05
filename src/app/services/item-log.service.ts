import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ItemLogService extends BaseService {

  constructor(private _router: Router, private _messageService: MessageService) {
    super(_router,_messageService);
    this.apiController = 'api/ItemLog';
  }

  getLogOfItem(itemId: string) {
    return this.BaseAPIConfig.get(`${this.apiController}/${itemId}`);
  }
}
