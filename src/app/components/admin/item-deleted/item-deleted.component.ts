import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-item-deleted',
  templateUrl: './item-deleted.component.html'
})
export class ItemDeletedComponent implements OnInit {

  thisItem: any;
  listTree: any[] = [];
  listItem: any[] = [];

  visibleLog: boolean = false;

  page: number = 1;
  pageSize: number = 10;
  pageSizeOptions: any[] = [10, 20, 50, 100, 200];
  totalRecords: number = 0;
  startItem = 0;
  endItem = 0;

  filterObject: any = {};
  categoryCode: string = '';

  itemIdToLog: any;

  formSearch: FormGroup;
  itemStatusList: any[] = [{ name: "All", value: null }, { name: "Using", value: 1 }, { name: "Broken", value: 2 }, { name: "UnderMaintenance", value: 3 }, { name: "Storage", value: 4 }, { name: "Liquidation", value: 5 }];

  constructor(
    private itemService: ItemService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService
  ) {
    this.formSearch = this.fb.group({
      filter: [],
      categoryCode: [],
      status: []
    });
  }

  ngOnInit() {
    this.listTree = JSON.parse( localStorage.getItem("treeCategory") || "[]")
    console.log(this.listTree);

    this.getListItem();
  }

  getListItem(reset: boolean = false): void {
    if (reset) { this.page = 1; }
    this.itemService.getItemsDeleted((this.page - 1) * this.pageSize,
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

  onSearchSubmit() {
    this.getListItem(true);
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


  restoreItem(item: any){
    this.confirmationService.confirm({
      key: 'hieunvConfirm',
      header: "Xác nhận",
      message: `Bạn có thực sự muốn restore lại đối tượng ${item.name} ?`,
      acceptLabel: "Restore",
      rejectLabel: "Hủy",
      accept: () => {
        this.itemService.undoDeleted(item.id).then((res: any) => {
          this.getListItem();
          this.messageService.add({ key: "toastUserView", severity: 'success', summary: "SUCCESS", detail: "Restore tượng thành công!" });
        }).catch((err: any) => {
          this.messageService.add({ key: "toastUserView", severity: 'error', summary: "FAILED", detail: "Restore tượng thất bại!" });
        });
      }
    });
  }

  openItemLog(item: any){
    this.itemIdToLog = item.id;
    this.visibleLog = true;
  }
}
