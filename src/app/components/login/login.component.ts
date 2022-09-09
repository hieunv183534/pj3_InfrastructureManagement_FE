import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService) {
    this.formLogin = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  ngOnInit() {
  }

  get f() { return this.formLogin.controls; }

  login() {

    (<any>Object).values(this.formLogin.controls).forEach((control : any) : any => {
      control.markAsDirty();
    });

    if (this.formLogin.valid) {
      this.authService.login(this.formLogin.value).then((res: any): any => {
        console.log(res.data);
        if (res.data.code == 1000) {
          this.messageService.add({ key: "toastUserView", severity: 'success', summary: "SUCCESS", detail: "Đăng nhập thành công!" });
          sessionStorage.setItem('token',res.data.data.token);
          sessionStorage.setItem('info',JSON.stringify(res.data.data.infomation));
          this.router.navigate(['../admin'], { relativeTo: this.route });
        }
      }, (err: any): any => {
        this.messageService.add({ key: "toastUserView", severity: 'error', summary: "FAILED", detail: "Đăng nhập thất bại!" });
      })
    }
  }

}
