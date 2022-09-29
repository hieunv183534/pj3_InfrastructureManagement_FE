import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExportExcelService } from 'src/app/services/export-excel.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  data0: any;
  data1: any;
  data2: any;
  overview: any;

  chartOptions: any;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private exportExcelService: ExportExcelService,
    private router: Router) {
    this.overview = JSON.parse(localStorage.getItem("overview") || '[1,5,5,1,1,1,1,1,1,1,1,1,1]');

  }

  ngOnInit() {
    this.renderData();
    this.authService.getOverView().then((res: any) => {
      if (JSON.stringify(this.overview) != JSON.stringify(res.data.data)) {
        localStorage.setItem('overview', JSON.stringify(res.data.data));
        this.overview = res.data.data;
        this.renderData();
      }
    });
  }

  onDataSelect(data: any) {
    if (data.element.index == 0) {
      this.router.navigate(['../category'], { relativeTo: this.route });
    } else if (data.element.index == 1) {
      this.router.navigate(['../item'], { relativeTo: this.route });
    } else {
      this.router.navigate(['../report-broken'], { relativeTo: this.route });
    }
  }

  renderData() {
    this.data0 = {
      labels: ['Số danh mục', 'Số đối tượng', 'Số báo cáo'],
      datasets: [
        {
          data: [this.overview[0], this.overview[1], this.overview[7]],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ],
          hoverOffset: 4
        }
      ]
    };

    this.data1 = {
      labels: ['Sử dụng', 'Bị hỏng', 'Sửa chữa', 'Cất kho', 'Thanh lí'],
      datasets: [
        {
          data: [this.overview[2], this.overview[3], this.overview[4], this.overview[5], this.overview[6]],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#24F05D",
            "#F203FC"
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#24F05D",
            "#F203FC"
          ]
        }
      ]
    };
    this.data2 = {
      labels: ['Mới', 'Đã xác nhận', 'Đã từ chối', 'Đang thực hiện', 'Hoàn thành'],
      datasets: [
        {
          data: [this.overview[8], this.overview[9], this.overview[10], this.overview[11], this.overview[12]],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ]
        }
      ]
    };
  }

  exportOverView() {
    this.exportExcelService.getOverView().then((res: any) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement("a");
      a.href = url;
      const filename = `file.xlsx`;
      a.setAttribute("download", filename);
      document.body.appendChild(a);
      a.click();
      a.remove();
    })
  }

  exportCategory() {
    this.exportExcelService.getCategory().then((res: any) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement("a");
      a.href = url;
      const filename = `file.xlsx`;
      a.setAttribute("download", filename);
      document.body.appendChild(a);
      a.click();
      a.remove();
    })
  }

  exportItem() {
    this.exportExcelService.getItem().then((res: any) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement("a");
      a.href = url;
      const filename = `file.xlsx`;
      a.setAttribute("download", filename);
      document.body.appendChild(a);
      a.click();
      a.remove();
    })
  }

  exportProblem() {
    this.exportExcelService.getProblem().then((res: any) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement("a");
      a.href = url;
      const filename = `file.xlsx`;
      a.setAttribute("download", filename);
      document.body.appendChild(a);
      a.click();
      a.remove();
    })
  }
}
