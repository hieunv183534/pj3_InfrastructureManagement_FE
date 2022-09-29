import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ReportService } from 'src/app/services/report.service';
import { Util } from 'src/app/shared/util/util';

@Component({
  selector: 'app-broken',
  templateUrl: './broken.component.html'
})
export class BrokenComponent implements OnInit {

  visibleAdd: boolean = false;
  listReport: any[] = [];

  page: number = 1;
  pageSize: number = 10;
  pageSizeOptions: any[] = [10, 20, 50, 100, 200];
  totalRecords: number = 0;
  startItem = 0;
  endItem = 0;

  data: any;
  reportId: any;

  statuses = ["", "Mới", "Đã duyệt", "Đã từ chối", "Đang xử lí", "Đã hoàn thành"];

  reportStatus: any = -1;

  statusOptions: any[] = [
    { name: 'Tất cả', value: -1 },
    { name: 'Mới báo cáo', value: 1 },
    { name: 'Đã xác nhận', value: 2 },
    { name: 'Đã từ chối', value: 3 },
    { name: 'Đang xử lí', value: 4 },
    { name: 'Hoàn thành', value: 5 },
  ]

  constructor(private reportService: ReportService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.getListItem();
  }

  onPageChange(value: any) {
    this.page = value.page + 1;
    this.pageSize = value.rows;
    this.getListItem();
  }

  getListItem(reset: boolean = false): void {
    if (reset) { this.page = 1; }
    this.reportService.getAdminReports((this.page - 1) * this.pageSize,
      this.pageSize,
      this.reportStatus,
      0).then((res: any) => {
        this.totalRecords = res.data.data.total;
        this.listReport = res.data.data.data;
      });
  }

  formatDateTime(d: any) {
    return Util.getDateTime(new Date(d));
  }

  updateReport(report: any) {
    console.log(report);

    this.data = {
      status: report.status,
      reply: report.reply,
      note: report.note,
      urls: report.urls
    }
    this.reportId = report.id;

    this.visibleAdd = true;
  }

  submitForm(data: any) {
    this.reportService.adminUpdateReport(this.reportId, data.status, data.reply).then((res: any) => {
      this.getListItem();
      this.visibleAdd = false;
      this.messageService.add({ key: "toastUserView", severity: 'success', summary: "SUCCESS", detail: "Cập nhật báo cáo thành công!" });
    }).catch((err: any) => {
      this.messageService.add({ key: "toastUserView", severity: 'error', summary: "FAILED", detail: "Cập nhật báo cáo thất bại!" });
    });
  }

}
