import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService extends BaseService {

  constructor() {
    super();
    this.apiController = 'api/Item';
  }

  getItems(index: number, count: number, filter: string, categoryCode: string, status: any) {
    let _filter = filter ? `&filter=${filter}` : '';
    let _categoryCode = categoryCode ? `&categoryCode=${categoryCode}` : '';
    let _status = status ? `&status=${status}` : '';
    return this.BaseAPIConfig.get(`${this.apiController}?index=${index}&count=${count}${_filter}${_categoryCode}${_status}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token"),
      }
    });
  }

  getChildPositions(itemId: string, index: number, count: number, filter: string, categoryCode: string){
    let _filter = filter ? `&filter=${filter}` : '';
    let _categoryCode = categoryCode ? `&categoryCode=${categoryCode}` : '';
    return this.BaseAPIConfig.get(`${this.apiController}/getChildPositions/${itemId}?index=${index}&count=${count}${_filter}${_categoryCode}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token"),
      }
    });
  }

  getChildAPartOfs(itemId: string, index: number, count: number, filter: string, categoryCode: string){
    let _filter = filter ? `&filter=${filter}` : '';
    let _categoryCode = categoryCode ? `&categoryCode=${categoryCode}` : '';
    return this.BaseAPIConfig.get(`${this.apiController}/getChildAPartOfs/${itemId}?index=${index}&count=${count}${_filter}${_categoryCode}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token"),
      }
    });
  }

  getItemDetail(itemId: string){
    return this.BaseAPIConfig.get(`${this.apiController}/getItemDetail/${itemId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token"),
      }
    });
  }
}
