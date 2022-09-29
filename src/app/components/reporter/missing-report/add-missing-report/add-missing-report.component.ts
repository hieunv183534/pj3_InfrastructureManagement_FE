import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-add-missing-report',
  templateUrl: './add-missing-report.component.html'
})
export class AddMissingReportComponent implements OnInit {

  @Input() display: boolean = false;
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() submit: EventEmitter<any> = new EventEmitter();
  rootId: string = "";
  treeCategory: any;
  pageSizeOptions: any[] = [10, 20, 50, 100, 200];
  formSearch: FormGroup;
  page: number = 1;
  pageSize: number = 10;
  totalRecords: number = 0;
  startItem = 0;
  endItem = 0;
  categoryCode: any = "";
  listItem: any[] = [];
  reportNote: string = "";
  choosedItem: any = {
    code: '',
    name: ''
  };
  choosedCategory: any;
  quantity: any;

  constructor(
    private fb: FormBuilder,
    private itemService: ItemService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.treeCategory = JSON.parse(localStorage.getItem('treeCategory') || '[]');
    this.formSearch = this.fb.group({
      filter: [],
      categoryCode: []
    });
  }

  ngOnInit() {
    this.getListItem();
  }

  hide() {
    this.close.emit();
  }

  getListItem(reset: boolean = false): void {
    if (reset) { this.page = 1; }
    this.itemService.getItems(
      (this.page - 1) * this.pageSize,
      this.pageSize,
      this.formSearch.value.filter,
      this.categoryCode,
      this.rootId
    ).then((res: any) => {
      if (res.data.code === 2004) {
        this.totalRecords = 0;
        this.listItem = [];
      } else {

        this.totalRecords = res.data.data.total;
        this.listItem = res.data.data.data;
        console.log(this.listItem);
      }
    });
  }

  onPageChange(value: any) {
    this.page = value.page + 1;
    this.pageSize = value.rows;
    this.getListItem();
  }

  onSearchSubmit() {
    this.getListItem(true);
  }

  selectCategory(node: any) {
    this.categoryCode = node.node.data.code;
  }

  selectCategory1(node: any) {
    console.log(node.node.data);
    this.choosedCategory = {
      id: node.node.data.id,
      name: node.node.label
    }
    this.renderContent();
  }

  reportThisItem(item: any) {
    this.choosedItem = item;
    this.renderContent();
  }

  renderContent() {
    if (this.choosedItem.code && this.choosedCategory && this.quantity) {
      this.reportNote = `${this.choosedItem.name} mã: ${this.choosedItem.code} cần thêm ${this.quantity} ${this.choosedCategory.name}`
    } else {
      this.reportNote = "";
    }
  }

  save() {
    if (this.choosedItem.code && this.choosedCategory && this.quantity) {
      this.submit.emit({
        positionId: this.choosedItem.id,
        categoryId: this.choosedCategory.id,
        quantity: this.quantity,
        note: this.reportNote
      });
    }
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

}
