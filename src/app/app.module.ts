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
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewTransportComponent } from './transport/newregistration/transportNew.component';
import { SearchMarkComponent } from './transport/search/searchmark.component';
import { SearchResultComponent } from './transport/search/searchresult.component';
import { TooltipModule } from 'primeng/tooltip';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { CaptchaModule } from 'primeng/captcha';
import { InputMaskModule } from 'primeng/inputmask';
import { TableModule } from 'primeng/table';
import { MembersService } from '../services/members.service';

@NgModule({
  declarations: [
    AppComponent,
    NewTransportComponent,
    SearchMarkComponent,
    SearchResultComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
    MessagesModule,
    MessageModule,
    TooltipModule,
    InputMaskModule,
    TableModule,
    CaptchaModule,
    SharedModule.forRoot()
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy },
  { provide: APP_BASE_HREF, useValue: '/' }, TransportService, MembersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
