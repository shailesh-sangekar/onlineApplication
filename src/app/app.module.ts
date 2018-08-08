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
import { NewTransportComponent } from './transport/transportNew.component';
import { TooltipModule } from 'primeng/tooltip';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import {CaptchaModule} from 'primeng/captcha';
import { MembersService } from '../services/members.service';

@NgModule({
  declarations: [
    AppComponent,
    NewTransportComponent,
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
    CaptchaModule,
    SharedModule.forRoot()
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy },
  { provide: APP_BASE_HREF, useValue: '/' }, TransportService, MembersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
