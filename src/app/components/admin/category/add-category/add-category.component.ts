import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  formAdd: FormGroup;
  @Input() display: boolean = false;
  @Input() data: any;
  @Input() formMode: string = "add";
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() submit: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder) {
    this.formAdd = this.fb.group({
      name: [null, [Validators.required]],
      code: [{value: null, disabled: true}, [Validators.required]],
      parentId: [{value: null, disabled: true}, [Validators.required]],
      level: [{value: null, disabled: true}, [Validators.required]],
      metaDatas: [[], []]
    });
  }

  ngOnInit() {
    this.formAdd.patchValue(this.data);
  }

  get f() { return this.formAdd.controls; }

  hide(){
    this.close.emit();
  }

  save(){
    (<any>Object).values(this.formAdd.controls).forEach((control : any) : any => {
      control.markAsDirty();
    });
    if(this.formAdd.valid){
      this.submit.emit(this.formAdd.value);
    }
  }

}
