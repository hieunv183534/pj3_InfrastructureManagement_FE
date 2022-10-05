import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService extends BaseService {

  constructor(private _router: Router, private _messageService: MessageService) {
    super(_router,_messageService);
    this.apiController = 'api/Item';
  }

  getItems(index: number, count: number, filter: string, categoryCode: string, status: any) {
    return this.BaseAPIConfig.get(`${this.apiController}`, {
      params: { index, count, filter, categoryCode, status }
    });
  }

  getItemsDeleted(index: number, count: number, filter: string, categoryCode: string, status: any) {
    return this.BaseAPIConfig.get(`${this.apiController}/deleted`, {
      params: { index, count, filter, categoryCode, status }
    });
  }

  undoDeleted(itemId: string) {
    return this.BaseAPIConfig.get(`${this.apiController}/undoDeleted/${itemId}`);
  }

  getChildPositions(itemId: string, index: number, count: number, filter: string, categoryCode: string) {
    return this.BaseAPIConfig.get(`${this.apiController}/getChildPositions/${itemId}`, {
      params: { index, count, filter, categoryCode }
    });
  }

  getChildAPartOfs(itemId: string, index: number, count: number, filter: string, categoryCode: string) {
    return this.BaseAPIConfig.get(`${this.apiController}/getChildAPartOfs/${itemId}`, {
      params: { index, count, filter, categoryCode }
    });
  }

  getItemDetail(itemId: string) {
    return this.BaseAPIConfig.get(`${this.apiController}/getItemDetail/${itemId}`);
  }

  deleteRelationship(id: string) {
    return this.BaseAPIConfig.delete(`${this.apiController}/deleteRelationship/${id}`);
  }

  addRelationship(body: any) {
    return this.BaseAPIConfig.post(`${this.apiController}/addRelationship`, body);
  }

  getRoot(itemId: string) {
    return this.BaseAPIConfig.get(`${this.apiController}/getRoot/${itemId}`);
  }

  getItemNoParent(index: number, count: number, filter: string, categoryCode: string, rootId: string) {
    return this.BaseAPIConfig.get(`${this.apiController}/getItemNoParent`, {
      params: { index, count, filter, categoryCode, rootId }
    });
  }

  getParentItem(itemId: string) {
    return this.BaseAPIConfig.get(`${this.apiController}/getParentItem/${itemId}`);
  }
}
