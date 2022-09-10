import { FormBuilder, FormGroup } from '@angular/forms';
import { Util } from './../../../shared/util/util';
import { ItemService } from './../../../services/item.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

  formSearch1: FormGroup;
  page1: number = 1;
  pageSize1: number = 10;
  totalRecords1: number = 0;
  startItem1 = 0;
  endItem1 = 0;
  categoryCode1: any = "";
  listItem1: any[] = [];

  formSearch2: FormGroup;
  page2: number = 1;
  pageSize2: number = 10;
  totalRecords2: number = 0;
  startItem2 = 0;
  endItem2 = 0;
  categoryCode2: any = "";
  listItem2: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService,
    private fb: FormBuilder
  ) {
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
      this.itemService.getItemDetail(params["itemId"]).then((res: any) => {
        this.itemDetail = res.data.data;
      });
      this.itemId = params["itemId"];
    });
    this.getListItem1();
    this.getListItem2();
  }

  getDateTime(d: any) {
    return this.util.getDateTime(new Date(d));
  }

  getStatus(s: number) {
    switch (s) {
      case 0:
        return "Using";
      case 1:
        return "Broken";
      case 2:
        return "UnderMaintenance";
      case 3:
        return "Storage";
      case 4:
        return "Liquidation";
      default: return "";
    }
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
        this.totalRecords1 = res.data.data.total;
        this.listItem1 = res.data.data.data;
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
        this.totalRecords2 = res.data.data.total;
        this.listItem2 = res.data.data.data;
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
}
