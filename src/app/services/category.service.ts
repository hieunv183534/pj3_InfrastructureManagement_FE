import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService {

  constructor(private _router: Router, private _messageService: MessageService) {
    super(_router,_messageService);
    this.apiController = 'api/Category';
  }

  deleteCategoryTree(categoryCode: string) {
    return this.BaseAPIConfig.delete(`${this.apiController}`, {
      params: {
        categoryCode
      }
    });
  }

}
