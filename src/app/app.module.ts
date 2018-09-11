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
import { UserlistComponent } from './user-action/user-list/user-list.component';
import { UserActionComponent } from './user-action/user-action/user-action.component';

import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserlistComponent,
    UserActionComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDczNGDt8Q76C4C_gaP0YnvxZA5Ay_HDOY'
    }),
    SharedModule.forRoot()
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy },
  { provide: APP_BASE_HREF, useValue: '/' }, TransportService],
  bootstrap: [AppComponent]
})
export class AppModule { }
