import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { CategoryComponent } from './components/admin/category/category.component';
import { HomeComponent } from './components/admin/home/home.component';
import { ItemRelationshipComponent } from './components/admin/item-relationship/item-relationship.component';
import { ItemComponent } from './components/admin/item/item.component';
import { ReportComponent } from './components/admin/report/report.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    children:[
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home', component: HomeComponent
      },
      {
        path: 'category', component: CategoryComponent
      },
      {
        path: 'item', component: ItemComponent
      },
      {
        path: 'relationship/:itemId', component: ItemRelationshipComponent
      },
      {
        path: 'report', component: ReportComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
