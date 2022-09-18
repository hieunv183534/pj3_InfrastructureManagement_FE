import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html'
})
export class AddItemComponent implements OnInit {

  formAdd: FormGroup;
  @Input() display: boolean = false;
  @Input() data: any;
  @Input() formMode: string = "add";
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() submit: EventEmitter<any> = new EventEmitter();
  thisCategory: any = null;
  treeCategory: any;
  itemStatusList: any[] = [{ name: "Using", value: 1 }, { name: "Broken", value: 2 }, { name: "UnderMaintenance", value: 3 }, { name: "Storage", value: 4 }, { name: "Liquidation", value: 5 }];

  metaDatas: string[] = [];
  moreDetail: string[] = [];

  constructor(private fb: FormBuilder) {
    this.treeCategory = JSON.parse(localStorage.getItem('treeCategory') || '[]');
    this.formAdd = this.fb.group({
      code: [{ value: `${Number(new Date()) + Math.floor(Math.random() * 90 + 10)}`, disabled: false }, []],
      name: [null, [Validators.required]],
      numOfDay: [null, []],
      qualityScore: [null, []],
      minScore: [null, []],
      categoryId: [null, []],
      status: [0, [Validators.required]],
    });
  }

  ngOnInit() {


    if (this.formMode == "update") {

      let listCategory = JSON.parse(localStorage.getItem('listCategory') || '[]');
      let cate = listCategory.find((c: any) => c.id == this.data.categoryId);
      this.thisCategory = cate;
      this.metaDatas = JSON.parse(cate.metaDatas);
      this.moreDetail = [];
      this.metaDatas.forEach((metaData: any) => {
        this.moreDetail.push( this.data.moreDetail[metaData]);
      });

      console.log(this.metaDatas);
      console.log(this.moreDetail);


      this.data.categoryId = {
        label: cate.name,
        key: this.data.categoryId,
        data: {
          id: this.data.categoryId,
          code: this.data.categoryCode
        }
      };
      this.formAdd.patchValue(this.data);
    }
  }

  get f() { return this.formAdd.controls; }

  hide() {
    this.close.emit();
  }

  save() {
    (<any>Object).values(this.formAdd.controls).forEach((control: any): any => {
      control.markAsDirty();
    });
    if (this.formAdd.valid && this.thisCategory) {
      let moreDetailObject: { [key: string]: string; } = {};
      for (let i = 0; i < this.metaDatas.length; i++) {
        moreDetailObject[this.metaDatas[i]] = this.moreDetail[i];
      }

      let valueData: any = {
        ...this.formAdd.value,
        categoryCode: this.formAdd.value.categoryId.data.code,
        categoryId: this.formAdd.value.categoryId.data.id,
        moreDetail: JSON.stringify(moreDetailObject)
      }
      this.submit.emit(valueData);
    }
  }

  selectCategory(node: any) {
    this.thisCategory = node.node.data;
    this.metaDatas = JSON.parse(node.node.data.metaDatas);
    this.moreDetail = new Array<string>(this.metaDatas.length);
  }

}
