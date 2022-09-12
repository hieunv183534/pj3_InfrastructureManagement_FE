import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-add-position',
  templateUrl: './add-position.component.html'
})
export class AddPositionComponent implements OnInit {

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

  chooseItem: any = {
    id: '',
    code: '',
    name: ''
  }

  constructor(
    private fb: FormBuilder,
    private itemService: ItemService,
    private messageService: MessageService
  ) {
    this.treeCategory = JSON.parse(localStorage.getItem('treeCategory') || '[]');
    this.formSearch = this.fb.group({
      filter: [],
      categoryCode: []
    });

    this.rootId = (JSON.parse(localStorage.getItem('rootItem') || '{}')).id;
  }

  ngOnInit() {
    this.getListItem();
  }

  hide() {
    this.close.emit();
  }

  save() {
    if(!this.chooseItem.id){
      this.messageService.add({ key: "toastUserView", severity: 'error', summary: "LỖI VALIDATION", detail: "Bạn chưa chọn đối tượng!" });
    }else{
      console.log(this.chooseItem);
      this.submit.emit(this.chooseItem);
    }
  }

  getListItem(reset: boolean = false): void {
    if (reset) { this.page = 1; }
    this.itemService.getItemNoParent(
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

  chooseThisItem(item: any) {
    this.chooseItem.id = item.id;
    this.chooseItem.code = item.code;
    this.chooseItem.name = item.name;
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
