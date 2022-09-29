import { MissingComponent } from './components/admin/report/missing/missing.component';
import { BrokenComponent } from './components/admin/report/broken/broken.component';
import { MissingReportComponent } from './components/reporter/missing-report/missing-report.component';
import { BrokenReportComponent } from './components/reporter/broken-report/broken-report.component';
import { ReporterComponent } from './components/reporter/reporter.component';
import { ItemDeletedComponent } from './components/admin/item-deleted/item-deleted.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { CategoryComponent } from './components/admin/category/category.component';
import { HomeComponent } from './components/admin/home/home.component';
import { ItemRelationshipComponent } from './components/admin/item-relationship/item-relationship.component';
import { ItemComponent } from './components/admin/item/item.component';
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
    path: 'reporter', component: ReporterComponent,
    children:[
      { path: '', redirectTo: 'broken', pathMatch: 'full' },
      {
        path: 'broken', component: BrokenReportComponent
      },
      {
        path: 'missing', component: MissingReportComponent
      },
    ]
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
        path: 'report-broken', component: BrokenComponent
      },
      {
        path: 'report-missing', component: MissingComponent
      },
      {
        path: 'item-deleted', component: ItemDeletedComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
