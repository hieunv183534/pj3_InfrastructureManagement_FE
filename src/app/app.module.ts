import { UpdateReportComponent } from './components/admin/report/update-report/update-report.component';
import { MissingComponent } from './components/admin/report/missing/missing.component';
import { BrokenComponent } from './components/admin/report/broken/broken.component';
import { AddMissingReportComponent } from './components/reporter/missing-report/add-missing-report/add-missing-report.component';
import { AddBrokenReportComponent } from './components/reporter/broken-report/add-broken-report/add-broken-report.component';
import { MissingReportComponent } from './components/reporter/missing-report/missing-report.component';
import { BrokenReportComponent } from './components/reporter/broken-report/broken-report.component';
import { ReporterComponent } from './components/reporter/reporter.component';
import { ItemDeletedComponent } from './components/admin/item-deleted/item-deleted.component';
import { ItemLogComponent } from './components/admin/item/item-log/item-log.component';
import { HomeComponent } from './components/admin/home/home.component';
import { AddPositionComponent } from './components/admin/item-relationship/add-position/add-position.component';
import { AddAPartComponent } from './components/admin/item-relationship/add-a-part/add-a-part.component';
import { ItemRelationshipComponent } from './components/admin/item-relationship/item-relationship.component';
import { AddItemComponent } from './components/admin/item/add-item/add-item.component';
import { ItemComponent } from './components/admin/item/item.component';
import { AddCategoryComponent } from './components/admin/category/add-category/add-category.component';
import { CategoryComponent } from './components/admin/category/category.component';
import { ReportService } from './services/report.service';
import { CategoryService } from './services/category.service';
import { ItemLogService } from './services/item-log.service';
import { ItemService } from './services/item.service';
import { AuthService } from './services/auth.service';
import { RegisterComponent } from './components/register/register.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ButtonModule} from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import {InputTextModule} from 'primeng/inputtext';
import {DividerModule} from 'primeng/divider';
import { TagModule } from 'primeng/tag';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MenubarModule } from 'primeng/menubar';
import { SpeedDialModule } from 'primeng/speeddial';
import {TreeTableModule} from 'primeng/treetable';
import { DialogModule } from 'primeng/dialog';
import { ChipsModule } from 'primeng/chips';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import {PaginatorModule} from 'primeng/paginator';
import { FieldsetModule } from 'primeng/fieldset';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import {SliderModule} from 'primeng/slider';
import { TreeSelectModule } from 'primeng/treeselect';
import {SelectButtonModule} from 'primeng/selectbutton';
import { AccordionModule } from 'primeng/accordion';
import { TabViewModule } from 'primeng/tabview';
import {CheckboxModule} from 'primeng/checkbox';
import { PanelModule } from 'primeng/panel';
import {ChartModule} from 'primeng/chart';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {FileUploadModule} from 'primeng/fileupload';
import {HttpClientModule} from '@angular/common/http';
import {GalleriaModule} from 'primeng/galleria';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    HomeComponent,
    CategoryComponent,
    AddCategoryComponent,
    ItemComponent,
    AddItemComponent,
    ItemRelationshipComponent,
    AddAPartComponent,
    AddPositionComponent,
    ItemLogComponent,
    ItemDeletedComponent,
    ReporterComponent,
    BrokenReportComponent,
    MissingReportComponent,
    AddBrokenReportComponent,
    AddMissingReportComponent,
    BrokenComponent,
    MissingComponent,
    UpdateReportComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule ,
    BrowserAnimationsModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    DividerModule,
    TagModule,
    ToastModule,
    MenubarModule,
    SpeedDialModule,
    TreeTableModule,
    DialogModule,
    ChipsModule,
    ConfirmDialogModule,
    PaginatorModule,
    FieldsetModule,
    ToolbarModule,
    TableModule,
    SliderModule,
    TreeSelectModule,
    SelectButtonModule,
    AccordionModule,
    TabViewModule,
    CheckboxModule,
    PanelModule,
    ChartModule,
    OverlayPanelModule,
    DropdownModule,
    InputTextareaModule,
    FileUploadModule,
    HttpClientModule,
    GalleriaModule
  ],
  providers: [
    AuthService,
    ItemService,
    ItemLogService,
    CategoryService,
    ReportService,
    MessageService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
