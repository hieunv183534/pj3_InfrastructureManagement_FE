import { Util } from './../../../../shared/util/util';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ItemLogService } from 'src/app/services/item-log.service';

@Component({
  selector: 'app-item-log',
  templateUrl: './item-log.component.html'
})
export class ItemLogComponent implements OnInit {

  @Input() itemId: any;
  @Input() display: boolean = false;
  @Output() close: EventEmitter<any> = new EventEmitter();

  logData: string = "";

  logTypes: any[] = ["Tạo mới", "Cập nhật dữ liệu", "Xóa bỏ", "Thêm đối tượng con", "Xóa bỏ đối tượng con", "Thêm vào đối tượng cha", "Xóa khỏi đối tượng cha", "Khôi phục lại đối tượng"]

  logs: any[] = [];

  constructor(private itemLogService: ItemLogService) { }

  ngOnInit() {
    this.itemLogService.getLogOfItem(this.itemId).then((res: any) => {
      this.logs = res.data.data;
    }).catch((err: any) => { });
  }

  hide() {
    this.close.emit();
  }

  save() {
    this.close.emit();
  }

  formatDateTime(d: any) {
    return Util.getDateTime(new Date(d));
  }

  showLog(_log: any) {
    let log = {..._log};
    log.logData = JSON.parse(log.logData);
    this.logData = JSON.stringify(log.logData, null, 2);
    console.log(this.logData);

  }

}
