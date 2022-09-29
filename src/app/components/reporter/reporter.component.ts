import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-reporter',
  templateUrl: './reporter.component.html',
  styleUrls: ['./reporter.component.css']
})
export class ReporterComponent implements OnInit {

  items: MenuItem[] = [];

  settings: MenuItem[] = [];

  constructor() { }

  ngOnInit() {
    this.items = [
      {
        label: "Báo hỏng CSVC",
        icon: "pi pi-ticket",
        routerLink: "broken"
      },
      {
        label: "Báo thiếu,cần thêm CSVC",
        icon: "pi pi-desktop",
        routerLink: "missing"
      }
    ]

    this.settings = [
      {
        icon: "pi pi-info-circle",
        label: "Thông tin"
      },
      {
        icon: "pi pi-sign-out",
        label: "Đăng xuất",
        routerLink: "../login"
      }
    ]
  }


}
