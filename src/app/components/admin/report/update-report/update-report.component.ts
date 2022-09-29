import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-update-report',
  templateUrl: './update-report.component.html'
})
export class UpdateReportComponent implements OnInit {

  @Input() display: boolean = false;
  @Input() data: any;
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() submit: EventEmitter<any> = new EventEmitter();

  reply: any;
  status: any;
  note: any;

  images: any[] = [];

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  reportStatusList: any[] = [{ name: "Mới", value: 1 }, { name: "Đã xác nhận", value: 2 }, { name: "Đã từ chối", value: 3 }, { name: "Đang xử lí", value: 4 }, { name: "Đã hoàn thành", value: 5 }];

  constructor() { }

  ngOnInit() {
    console.log(this.data);

    this.status = this.data.status;
    this.reply = this.data.reply;
    this.note = this.data.note;
    let i = 1;
    this.data.urls.split("|||").forEach((url: any) => {
      this.images.push({
        "previewImageSrc": "http://hieunvpj3-001-site1.htempurl.com/images/" + url,
        "thumbnailImageSrc": "http://hieunvpj3-001-site1.htempurl.com/images/" + url,
        "alt": "Description for Image " + i,
        "title": "Title " + i
      });
      i++;
    });

    console.log(this.images);

  }

  save() {
    if (this.status && this.reply) {
      this.submit.emit({ status: this.status, reply: this.reply });
    }
  }

  hide() {
    this.close.emit();
  }

}
