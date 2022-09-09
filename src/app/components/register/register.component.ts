import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formRegister: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService) {
    this.formRegister = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      fullName: [null, [Validators.required]],
      email: [null, [Validators.required]],
    });
  }

  ngOnInit() {
  }

  get f() { return this.formRegister.controls; }

  register() {

    (<any>Object).values(this.formRegister.controls).forEach((control : any) : any => {
      control.markAsDirty();
    });

    if (this.formRegister.valid) {
      this.authService.signup(this.formRegister.value).then((res: any): any => {
        console.log(res.data);
        if(res.data.code == 2001){
          this.messageService.add({ key: "toastUserView", severity: 'success', summary: "SUCCESS", detail: "Đăng ký tài khoản thành công!" });
        }
      }).catch((err: any): any => {
        this.messageService.add({ key: "toastUserView", severity: 'error', summary: "FAILED", detail: "Đăng ký tài khoản thất bại !" });
      })
    }
  }

}
