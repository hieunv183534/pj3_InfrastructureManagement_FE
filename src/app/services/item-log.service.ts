import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ItemLogService extends BaseService {

  constructor() {
    super();
    this.apiController = 'api/ItemLog';
  }

  getLogOfItem(itemId: string) {
    return this.BaseAPIConfig.get(`${this.apiController}/${itemId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token"),
      }
    });
  }
}
