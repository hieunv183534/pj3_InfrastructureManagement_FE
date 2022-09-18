import { ItemService } from './../../../services/item.service';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html'
})
export class ItemComponent implements OnInit {

  visibleAdd: boolean = false;
  visibleLog: boolean = false;
  formMode: string = 'add';
  thisItem: any;
  listTree: any[] = [];
  listItem: any[] = [];
  itemIdToLog: any;

  page: number = 1;
  pageSize: number = 10;
  pageSizeOptions: any[] = [10, 20, 50, 100, 200];
  totalRecords: number = 0;
  startItem = 0;
  endItem = 0;

  filterObject: any = {};
  categoryCode: string = '';

  formSearch: FormGroup;
  itemStatusList: any[] = [{ name: "All", value: null }, { name: "Using", value: 1 }, { name: "Broken", value: 2 }, { name: "UnderMaintenance", value: 3 }, { name: "Storage", value: 4 }, { name: "Liquidation", value: 5 }];

  constructor(
    private categoryService: CategoryService,
    private itemService: ItemService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.formSearch = this.fb.group({
      filter: [],
      categoryCode: [],
      status: []
    });
  }

  ngOnInit() {
    this.categoryService.getList().then((res: any) => {
      let cates: any[] = res.data.data;
      localStorage.setItem('listCategory', JSON.stringify(cates))
      this.listTree = this.getDataByParentId(cates)
      localStorage.setItem('treeCategory', JSON.stringify(this.listTree));
    });

    this.getListItem();
  }

  getListItem(reset: boolean = false): void {
    if (reset) { this.page = 1; }
    this.itemService.getItems((this.page - 1) * this.pageSize,
      this.pageSize,
      this.formSearch.value.filter,
      this.categoryCode,
      this.formSearch.value.status).then((res: any) => {
        console.log(res);
        this.totalRecords = res.data.data.total;
        this.listItem = res.data.data.data;

        console.log(this.listItem);

      });
  }

  onPageChange(value: any) {
    this.page = value.page + 1;
    this.pageSize = value.rows;
    this.getListItem();
  }

  selectCategory(node: any) {
    this.categoryCode = node.node.data.code;
  }

  addItemOnClick() {
    this.formMode = "add";
    this.visibleAdd = true;
  }

  closeFormAdd() {
    this.visibleAdd = false;
  }

  getDataByParentId(data: any[], parent?: string): any {
    let result: any[] = [];
    if (parent) {
      result = data
        .filter(d => d.parentId == parent);
    } else {
      result = data
        .filter(d => d.level == 1);
    }
    let count = 0;
    result.forEach(element => {
      count++;
    });
    if (!result && !count) {
      return null;
    }
    return result.map((category) =>
    ({
      data: {
        id: category.id,
        code: category.code,
        metaDatas: category.metaDatas
      },
      key: category.id,
      label: category.name,
      children: this.getDataByParentId(data, category.id)
    }))
  };

  formOnSubmit(value: any) {
    if (this.formMode == "add") {
      this.addItem(value);
    } else {
      this.updateItem(value);
    }
  }

  onSearchSubmit() {
    this.getListItem(true);
  }

  addItem(value: any) {
    this.itemService.add(value).then((res: any) => {
      this.getListItem();
      this.visibleAdd = false;
      this.messageService.add({ key: "toastUserView", severity: 'success', summary: "SUCCESS", detail: "Thêm đối tượng thành công!" });
    }).catch((err: any) => {
      this.messageService.add({ key: "toastUserView", severity: 'error', summary: "FAILED", detail: "Thêm đối tượng thất bại!" });
    });
  }

  updateItem(value: any) {
    let newValue = {
      ...this.thisItem,
      code: value.code,
      name: value.name,
      numOfDay: value.numOfDay,
      qualityScore: value.qualityScore,
      minScore: value.minScore,
      categoryCode: value.categoryCode,
      categoryId: value.categoryId,
      status: value.status,
      moreDetail: value.moreDetail
    }

    this.itemService.update(newValue).then((res: any) => {
      this.getListItem();
      this.visibleAdd = false;
      this.messageService.add({ key: "toastUserView", severity: 'success', summary: "SUCCESS", detail: "Sửa đối tượng thành công!" });
    }).catch((err: any) => {
      this.messageService.add({ key: "toastUserView", severity: 'error', summary: "FAILED", detail: "Sửa đối tượng thất bại!" });
    });
  }

  updateItemOnClick(item: any) {
    this.thisItem = { ...item, moreDetail: JSON.parse(item.moreDetail) }
    this.formMode = "update";
    this.visibleAdd = true;
  }

  deleteItem(item: any) {
    this.confirmationService.confirm({
      key: 'hieunvConfirm',
      header: "Xác nhận",
      message: `Bạn có thực sự muốn xóa Đối tượng ${item.name} ?`,
      acceptLabel: "Xóa",
      rejectLabel: "Hủy",
      accept: () => {
        this.itemService.delete(item.id).then((res: any) => {
          this.getListItem();
          this.messageService.add({ key: "toastUserView", severity: 'success', summary: "SUCCESS", detail: "Xóa đối tượng thành công!" });
        }).catch((err: any) => {
          this.messageService.add({ key: "toastUserView", severity: 'error', summary: "FAILED", detail: "Xóa đối tượng thất bại!" });
        });
      }
    });
  }

  relationshipOnClick(item: any){
    this.router.navigate(['../relationship/'+ item.id], { relativeTo: this.route });
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

  openItemLog(item: any){
    this.itemIdToLog = item.id;
    this.visibleLog = true;
  }
}
