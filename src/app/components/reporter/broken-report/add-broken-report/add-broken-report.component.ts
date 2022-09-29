import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-add-broken-report',
  templateUrl: './add-broken-report.component.html'
})
export class AddBrokenReportComponent implements OnInit {

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

  uploadedFiles: any[] = [];

  urls: string = "";

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

  save() {
    this.submit.emit({
      positionId: this.choosedItem.id,
      note: this.reportNote,
      urls: this.urls
    });
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

  reportThisItem(item: any) {
    this.choosedItem = item;
    this.reportNote = `${item.name} Mã: ${item.code} đang bị hư hỏng`;
  }

  submitReport(item: any) {
    this.submit.emit(item);
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

  onUpload(event: any) {
    let arrUrl = [];
    for (let file of event.files) {
      this.uploadedFiles.push(file);
      arrUrl.push(file.name);
    }
    this.urls = arrUrl.join("|||");
    this.messageService.add({ severity: 'info', summary: 'File Uploaded', detail: '' });
  }

}
