import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  items: MenuItem[] = [];

  settings: MenuItem[] = [];



  constructor() { }

  ngOnInit() {
    this.items = [
      {
        label: "Trang chủ",
        icon: "pi pi-home",
        routerLink: "home"
      },
      {
        label: "Quản lí danh mục",
        icon: "pi pi-sitemap",
        routerLink: "category"
      },
      {
        label: "Quản lí đối tượng",
        icon: "pi pi-building",
        routerLink: "item",
        items: [
          {
            label: "Đối tượng đã xóa",
            icon: "pi pi-trash",
            routerLink: "item-deleted",
          }
        ]
      },
      {
        label: "Vấn đề",
        icon: "pi pi-file",
        items:[
          {
            label: "Báo hỏng",
            icon: "pi pi-ticket",
            routerLink: "report-broken",
          },
          {
            label: "Báo thiếu",
            icon: "pi pi-desktop",
            routerLink: "report-missing",
          }
        ]
      }
    ];

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
