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

  getItemsDeleted(index: number, count: number, filter: string, categoryCode: string, status: any) {
    let _filter = filter ? `&filter=${filter}` : '';
    let _categoryCode = categoryCode ? `&categoryCode=${categoryCode}` : '';
    let _status = status ? `&status=${status}` : '';
    return this.BaseAPIConfig.get(`${this.apiController}/deleted?index=${index}&count=${count}${_filter}${_categoryCode}${_status}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token"),
      }
    });
  }

  undoDeleted(itemId: string) {
    return this.BaseAPIConfig.get(`${this.apiController}/undoDeleted/${itemId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token"),
      }
    });
  }

  getChildPositions(itemId: string, index: number, count: number, filter: string, categoryCode: string) {
    let _filter = filter ? `&filter=${filter}` : '';
    let _categoryCode = categoryCode ? `&categoryCode=${categoryCode}` : '';
    return this.BaseAPIConfig.get(`${this.apiController}/getChildPositions/${itemId}?index=${index}&count=${count}${_filter}${_categoryCode}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token"),
      }
    });
  }

  getChildAPartOfs(itemId: string, index: number, count: number, filter: string, categoryCode: string) {
    let _filter = filter ? `&filter=${filter}` : '';
    let _categoryCode = categoryCode ? `&categoryCode=${categoryCode}` : '';
    return this.BaseAPIConfig.get(`${this.apiController}/getChildAPartOfs/${itemId}?index=${index}&count=${count}${_filter}${_categoryCode}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token"),
      }
    });
  }

  getItemDetail(itemId: string) {
    return this.BaseAPIConfig.get(`${this.apiController}/getItemDetail/${itemId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token"),
      }
    });
  }

  deleteRelationship(id: string) {
    return this.BaseAPIConfig.delete(`${this.apiController}/deleteRelationship/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token"),
      }
    });
  }

  addRelationship(body: any) {
    return this.BaseAPIConfig.post(`${this.apiController}/addRelationship`, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token"),
      }
    });
  }

  getRoot(itemId: string){
    return this.BaseAPIConfig.get(`${this.apiController}/getRoot/${itemId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token"),
      }
    });
  }

  getItemNoParent(index: number, count: number, filter: string, categoryCode: string, rootId: string){
    let _filter = filter ? `&filter=${filter}` : '';
    let _categoryCode = categoryCode ? `&categoryCode=${categoryCode}` : '';
    let _rootId = rootId ? `&rootId=${rootId}` : '';
    return this.BaseAPIConfig.get(`${this.apiController}/getItemNoParent?index=${index}&count=${count}${_filter}${_categoryCode}${_rootId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token"),
      }
    });
  }

  getParentItem(itemId: string){
    return this.BaseAPIConfig.get(`${this.apiController}/getParentItem/${itemId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token"),
      }
    });
  }
}
