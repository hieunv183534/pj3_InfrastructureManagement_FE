import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ReportService } from 'src/app/services/report.service';
import { Util } from 'src/app/shared/util/util';

@Component({
  selector: 'app-missing-report',
  templateUrl: './missing-report.component.html'
})
export class MissingReportComponent implements OnInit {

  visibleAdd: boolean = false;
  listReport: any[] = [];

  page: number = 1;
  pageSize: number = 10;
  pageSizeOptions: any[] = [10, 20, 50, 100, 200];
  totalRecords: number = 0;
  startItem = 0;
  endItem = 0;

  reply: any = "";
  displayReply: boolean =  false;

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
    this.reportService.getMyReports((this.page - 1) * this.pageSize,
      this.pageSize,
      this.reportStatus,
      1).then((res: any) => {
        console.log(res);
        this.totalRecords = res.data.data.total;
        this.listReport = res.data.data.data;
      });
  }

  submitForm(data: any) {
    let newReport = {
      ...data,
      reporterId: JSON.parse(sessionStorage.getItem('info') || '{}').id,
      type: 1
    }

    this.reportService.add(newReport).then((res: any) => {
      this.getListItem();
      this.visibleAdd = false;
      this.messageService.add({ key: "toastUserView", severity: 'success', summary: "SUCCESS", detail: "Báo thiếu thành công!" });
    }).catch((err: any) => {
      this.messageService.add({ key: "toastUserView", severity: 'success', summary: "SUCCESS", detail: "Báo thiếu thất bại!" });
    });
  }

  deleteReport(report: any) {
    this.confirmationService.confirm({
      key: 'hieunvConfirm',
      header: "Xác nhận",
      message: `Bạn có thực sự muốn xóa Báo thiếu ${report.positionItem.name} này?`,
      acceptLabel: "Xóa",
      rejectLabel: "Hủy",
      accept: () => {
        this.reportService.delete(report.id).then((res: any) => {
          this.getListItem();
          this.messageService.add({ key: "toastUserView", severity: 'success', summary: "SUCCESS", detail: "Xóa báo thiếu thành công!" });
        }).catch((err: any) => {
          this.messageService.add({ key: "toastUserView", severity: 'error', summary: "FAILED", detail: "Xóa báo thiếu thất bại!" });
        });
      }
    });
  }

  formatDateTime(d: any) {
    return Util.getDateTime(new Date(d));
  }


  showReply(reply: any){
    this.reply = reply;
    console.log(this.reply);

    this.displayReply = true;
  }
}
