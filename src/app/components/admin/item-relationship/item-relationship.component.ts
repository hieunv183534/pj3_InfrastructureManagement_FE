import { FormBuilder, FormGroup } from '@angular/forms';
import { Util } from './../../../shared/util/util';
import { ItemService } from './../../../services/item.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-item-relationship',
  templateUrl: './item-relationship.component.html'
})
export class ItemRelationshipComponent implements OnInit {

  itemDetail: any;
  util: any = Util;
  treeCategory: any;
  pageSizeOptions: any[] = [10, 20, 50, 100, 200];
  itemId: string = "";
  parentItem: any = null;

  formSearch1: FormGroup;
  page1: number = 1;
  pageSize1: number = 10;
  totalRecords1: number = 0;
  startItem1 = 0;
  endItem1 = 0;
  categoryCode1: any = "";
  listItem1: any[] = [];
  isVisibleForm1: boolean = false;

  formSearch2: FormGroup;
  page2: number = 1;
  pageSize2: number = 10;
  totalRecords2: number = 0;
  startItem2 = 0;
  endItem2 = 0;
  categoryCode2: any = "";
  listItem2: any[] = [];
  isVisibleForm2: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemService: ItemService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };

    this.treeCategory = JSON.parse(localStorage.getItem('treeCategory') || '[]');
    this.formSearch1 = this.fb.group({
      filter: [],
      categoryCode: []
    });
    this.formSearch2 = this.fb.group({
      filter: [],
      categoryCode: []
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.itemId = params["itemId"];
      this.getItemDetail();
      this.getParentItem();
      this.getRoot();
    });
    this.getListItem1();
    this.getListItem2();
  }

  getItemDetail() {
    this.itemService.getItemDetail(this.itemId).then((res: any) => {
      this.itemDetail = res.data.data;
    });
  }

  getParentItem() {
    this.itemService.getParentItem(this.itemId).then((res: any) => {
      if (res.data.data){
        this.parentItem = res.data.data.item;
        this.parentItem.relationship = res.data.data.relation.relationshipType == 1 ? "Thành phần" : "Vùng chứa";
      }
      else
        this.parentItem = null;
    })
  }

  getDateTime(d: any) {
    return this.util.getDateTime(new Date(d));
  }

  getStatus(s: number) {
    switch (s) {
      case 1:
        return "Using";
      case 2:
        return "Broken";
      case 3:
        return "UnderMaintenance";
      case 4:
        return "Storage";
      case 5:
        return "Liquidation";
      default: return "";
    }
  }

  relationshipOnClick(item: any) {
    this.router.navigate(['../../relationship/' + item.id], { relativeTo: this.route });
  }

  getRoot() {
    this.itemService.getRoot(this.itemId).then((res: any) => {
      localStorage.setItem('rootItem', JSON.stringify(res.data.data));
    })
  }

  // ---------------------------------------------------

  getListItem1(reset: boolean = false): void {
    if (reset) { this.page1 = 1; }
    this.itemService.getChildAPartOfs(
      this.itemId,
      (this.page1 - 1) * this.pageSize1,
      this.pageSize1,
      this.formSearch1.value.filter,
      this.categoryCode1).then((res: any) => {
        if (res.data.code === 2004) {
          this.totalRecords1 = 0;
          this.listItem1 = [];
        } else {
          this.totalRecords1 = res.data.data.total;
          this.listItem1 = res.data.data.data;
        }
      });
  }

  getListItem2(reset: boolean = false): void {
    if (reset) { this.page2 = 1; }
    this.itemService.getChildPositions(
      this.itemId,
      (this.page2 - 1) * this.pageSize2,
      this.pageSize2,
      this.formSearch2.value.filter,
      this.categoryCode2).then((res: any) => {
        if (res.data.code === 2004) {
          this.totalRecords2 = 0;
          this.listItem2 = [];
        } else {
          this.totalRecords2 = res.data.data.total;
          this.listItem2 = res.data.data.data;
        }
      });
  }

  selectCategory1(node: any) {
    this.categoryCode1 = node.node.data.code;
  }

  selectCategory2(node: any) {
    this.categoryCode2 = node.node.data.code;
  }

  onSearchSubmit1() {
    this.getListItem1(true);
  }

  onSearchSubmit2() {
    this.getListItem2(true);
  }

  onPageChange1(value: any) {
    this.page1 = value.page + 1;
    this.pageSize1 = value.rows;
    this.getListItem1();
  }

  onPageChange2(value: any) {
    this.page2 = value.page + 1;
    this.pageSize2 = value.rows;
    this.getListItem2();
  }

  deleteRelationship2(item: any) {
    this.confirmationService.confirm({
      key: 'hieunvConfirm',
      header: "Xác nhận",
      message: `Bạn có thực sự muốn xóa Đối tượng ${item.name} khỏi vùng chứa của đối tượng ${this.itemDetail.baseInfo.item.name}?`,
      acceptLabel: "Xóa",
      rejectLabel: "Hủy",
      accept: () => {
        this.itemService.deleteRelationship(item.relationId).then((res: any) => {
          this.getListItem2();
          this.getItemDetail();
          this.messageService.add({ key: "toastUserView", severity: 'success', summary: "SUCCESS", detail: "Xóa thành công!" });
        }).catch((err: any) => {
          this.messageService.add({ key: "toastUserView", severity: 'error', summary: "FAILED", detail: "Xóa thất bại!" });
        });
      }
    });
  }

  deleteRelationship1(item: any) {
    this.confirmationService.confirm({
      key: 'hieunvConfirm',
      header: "Xác nhận",
      message: `Bạn có thực sự muốn xóa Đối tượng ${item.name} khỏi thành phần của đối tượng ${this.itemDetail.baseInfo.item.name}?`,
      acceptLabel: "Xóa",
      rejectLabel: "Hủy",
      accept: () => {
        this.itemService.deleteRelationship(item.relationId).then((res: any) => {
          this.getListItem1();
          this.getItemDetail();
          this.messageService.add({ key: "toastUserView", severity: 'success', summary: "SUCCESS", detail: "Xóa thành công!" });
        }).catch((err: any) => {
          this.messageService.add({ key: "toastUserView", severity: 'error', summary: "FAILED", detail: "Xóa thất bại!" });
        });
      }
    });
  }

  addItemOnClick1() {
    this.isVisibleForm1 = true;
  }

  addItemOnClick2() {
    this.isVisibleForm2 = true;
  }

  closeForm1() {
    this.isVisibleForm1 = false;
  }

  closeForm2() {
    this.isVisibleForm2 = false;
  }

  submitForm1(data: any) {
    this.itemService.addRelationship({
      itemId: data.id,
      parentId: this.itemId,
      isFixed: data.isFixed,
      relationshipType: 1
    }).then((res: any) => {
      this.getListItem1();
      this.getItemDetail();
      this.isVisibleForm1 = false;
      this.messageService.add({ key: "toastUserView", severity: 'success', summary: "SUCCESS", detail: "Thêm đối tượng thành phần thành công!" });
    }).catch((err: any) => {
      this.messageService.add({ key: "toastUserView", severity: 'error', summary: "FAILED", detail: "Thêm đối tượng thành phần thất bại!" });
    });
  }

  submitForm2(data: any) {
    this.itemService.addRelationship({
      itemId: data.id,
      parentId: this.itemId,
      isFixed: false,
      relationshipType: 0
    }).then((res: any) => {
      this.getListItem2();
      this.getItemDetail();
      this.isVisibleForm2 = false;
      this.messageService.add({ key: "toastUserView", severity: 'success', summary: "SUCCESS", detail: "Thêm đối tượng chứa thành công!" });
    }).catch((err: any) => {
      this.messageService.add({ key: "toastUserView", severity: 'error', summary: "FAILED", detail: "Thêm đối tượng chứa thất bại!" });
    });
  }
}
