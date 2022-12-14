import { CategoryService } from './../../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService, TreeNode } from 'primeng/api';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  treeData: TreeNode[] = [];
  listCategory: any[] = [];

  visibleAdd: boolean = false;
  formMode: string = 'add';
  thisCategory: any;


  constructor(private categoryService: CategoryService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.getListCategory();
  }

  getListCategory() {
    this.categoryService.getList().then((res: any) => {
      let cates: any[] = res.data.data;
      this.treeData = <TreeNode[]>this.getDataByParentId(cates)
      this.listCategory = res.data.data;
    }).catch((err: any) => {

    });
  }

  getParentCode(code: string) {
    let codeArr = code.split("|");
    codeArr.pop();
    codeArr.pop();
    codeArr.shift();
    return "|" + codeArr.join("|") + "|";
  }

  getSeftCode(code: string): number {
    let codeArr = code.split("|");
    codeArr.pop();
    return Number(codeArr.pop());
  }

  getDataByParentId(data: any[], parent?: string): any {
    let result: any[] = [];
    if (parent) {
      result = data
        .filter(d => d.parentId == parent);
    } else {
      result = data
        .filter(d => d.level == 1);
    }

    let count = 0;
    result.forEach(element => {
      count++;
    });

    if (!result && !count) {
      return null;
    }

    return result.map((category) =>
    ({
      data: category,
      children: this.getDataByParentId(data, category.id)
    }))
  };

  getNewCode(node: any): string {
    if (node) {
      let max: number = 0;
      let childs = this.listCategory.filter(c => c.parentId == node.id);
      childs.forEach((nodeChild: any) => {
        let childCode = this.getSeftCode(nodeChild.code);
        max = childCode > max ? childCode : max;
      });
      return node.code + (max + 1) + "|";
    } else {
      let max: number = 0;
      let childs = this.listCategory.filter(c => c.level == 1);
      childs.forEach((nodeChild: any) => {
        let childCode = this.getSeftCode(nodeChild.code);
        max = childCode > max ? childCode : max;
      });
      return "|" + (max + 1) + "|";
    }

  }

  addOnClickCategory(category: any) {
    this.thisCategory = {
      code: this.getNewCode(category),
      level: category.level + 1,
      name: null,
      parentId: category.id,
      metaDatas: []
    }
    this.formMode = "add";
    this.visibleAdd = true;
  }

  addRootCategory() {
    this.thisCategory = {
      code: this.getNewCode(null),
      level: 1,
      name: null,
      parentId: null,
      metaDatas: []
    }
    this.formMode = "add";
    this.visibleAdd = true;
  }

  deleteCategoryOnClick(data: any) {
    this.confirmationService.confirm({
      key: 'hieunvConfirm',
      header: "X??c nh???n",
      message: `B???n c?? th???c s??? mu???n x??a Danh m???c ${data.name} v?? to??n b??? c??c danh m???c con`,
      acceptLabel: "X??a",
      rejectLabel: "H???y",
      accept: () => {
        this.categoryService.deleteCategoryTree(data.code).then((res: any) => {
          this.getListCategory();
          this.messageService.add({ key: "toastUserView", severity: 'success', summary: "SUCCESS", detail: "X??a danh m???c th??nh c??ng!" });
        }).catch((err: any) => {
          this.messageService.add({ key: "toastUserView", severity: 'error', summary: "FAILED", detail: "X??a danh m???c th???t b???i!" });
        });
      }
    });
  }

  updateCategoryOnClick(category: any) {
    this.thisCategory = { ...category, metaDatas: JSON.parse(category.metaDatas) }
    this.formMode = "update";
    this.visibleAdd = true;
  }

  closeForm() {
    this.visibleAdd = false;
  }

  submitForm(data: any) {
    if (this.formMode == "add") {
      this.addCategory(data);
    } else {
      this.updateCategory(data);
    }
  }

  addCategory(data: any) {
    this.thisCategory.name = data.name;
    this.thisCategory.metaDatas = JSON.stringify(data.metaDatas);
    this.categoryService.add(this.thisCategory).then((res: any) => {
      this.getListCategory();
      this.visibleAdd = false;
      this.messageService.add({ key: "toastUserView", severity: 'success', summary: "SUCCESS", detail: "Th??m danh m???c th??nh c??ng!" });
    }).catch((err: any) => {
      this.messageService.add({ key: "toastUserView", severity: 'error', summary: "FAILED", detail: "Th??m danh m???c th???t b???i!" });
    });
  }

  updateCategory(data: any) {
    this.thisCategory.name = data.name;
    this.thisCategory.metaDatas = JSON.stringify(data.metaDatas);
    this.categoryService.update(this.thisCategory).then((res: any) => {
      this.getListCategory();
      this.visibleAdd = false;
      this.messageService.add({ key: "toastUserView", severity: 'success', summary: "SUCCESS", detail: "S???a danh m???c th??nh c??ng!" });
    }).catch((err: any) => {
      this.messageService.add({ key: "toastUserView", severity: 'error', summary: "FAILED", detail: "S???a danh m???c th???t b???i!" });
    });
  }
}
