import { BaseService } from './base.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService {

  constructor() {
    super();
    this.apiController = 'api/Category';
  }

  deleteCategoryTree(code: string) {
    return this.BaseAPIConfig.delete(`${this.apiController}?categoryCode=${code}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token"),
      }
    });
  }

}
