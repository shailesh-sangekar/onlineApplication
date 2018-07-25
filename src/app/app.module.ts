import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TransportService } from '../services/transport.service';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { APP_BASE_HREF, CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app.routing';
import { DashboardComponent } from './dashboard/dashboard.compnent';
import { ServiceDashboardComponent } from './dashboard/serviceDashboard/servicedashboard.component';
import { UserlistComponent } from './user-action/user-list/user-list.component';
import { UserActionComponent } from './user-action/user-action/user-action.component';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ServiceDashboardComponent,
    UserlistComponent,
    UserActionComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
    TableModule,
    SharedModule.forRoot()
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy },
  { provide: APP_BASE_HREF, useValue: '/' }, TransportService],
  bootstrap: [AppComponent]
})
export class AppModule { }
