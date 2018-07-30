import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { APP_BASE_HREF, CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app.routing';
import { TableModule } from 'primeng/table';
import { SharedModule } from '../shared/shared.module';
import { TransportService } from '../services';
import { DashboardComponent, ServiceDashboardComponent } from './dashboard';
import { UserlistComponent, UserActionComponent } from './user-action';
import { ChartModule } from 'primeng/chart';
import { TooltipModule } from 'primeng/tooltip';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';

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
    ChartModule,
    MessagesModule,
    MessageModule,
    TooltipModule,
    SharedModule.forRoot()
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy },
  { provide: APP_BASE_HREF, useValue: '/' }, TransportService],
  bootstrap: [AppComponent]
})
export class AppModule { }
