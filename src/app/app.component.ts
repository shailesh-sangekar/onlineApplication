import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthInfo } from '../shared/models/authInfo';
import { AuthTokenService } from '../shared/services/authToken.service';
import { CommonService } from '../shared/services/common.service';
import { SpService } from '../shared/services/spcommon.service';
import { TransportService } from '../services/transport.service';
import { Router } from '@angular/router';
import { Config } from '../shared/config/config';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SpService]
})
export class AppComponent implements OnInit, AfterViewInit {

  model: AuthInfo;
  loggedInUser: any = '';
  loginName: string;
  errorMessage: string;
  loggedInUserData: any;


  title = 'app';
  displayError = true;
  announcementList: any;
  slideConfig: any;
  url: any = '';
  constructor(private _commonService: CommonService, private _authTokenService: AuthTokenService,
    private _transportService: TransportService, private _spService: SpService,
    private _router: Router) {
    this.model = new AuthInfo('password', '', '');
    this._spService.baseUrl = '';
    this.announcementList = [];
    this.url = Config.getRootURL();
  }

  submitTransportData() {
    this.displayError = false;
    console.log('submit function' + this.displayError);


  }

  ngOnInit() {
    // this.loggedInUser = 'Ankit.panchal';
    // this.loginName = 'Ankit.panchal';
    this.slideConfig = { 'slidesToShow': 1, 'slidesToScroll': 1 };
    this.getLoggedInUser();
    this.getAnnouncement();
    // this.getBirthDate();
    // this.getTransport();
    // this.getAuthToken();
    // this._spService.read('test').then(function (response) {
    //   console.log(response.d.results);
    // });
  }
  ngAfterViewInit() {
  }
  getAuthToken() {

    this.model.UserName = this.loginName;
    this.model.Password = 'Espl@123';
    this._commonService.getAuthToken(this.model)
      .subscribe(
      (results: any) => {

        console.log('Access grated for current user');
        console.log(results);
      },
      error => {

        this.errorMessage = <any>error;
        // this._router.navigate(['/unauthorized', 1]);
      });
  }
  getLoggedInUser() {
    const ctl = this;
    this._spService.getCurrentUser().then(function (response) {
      console.log('Current User:', response.d);
      ctl.loggedInUser = response.d.Title;
    });
  }
  getAnnouncement() {
    console.log('from transport');
    const ctl = this;
    this._spService.read('IBLAnnouncement').then(function (response) {
      console.log(response.d.results);
      ctl.announcementList = response.d.results;
      for (let i = 0; i < ctl.announcementList.length; i++) {
        if (i === 0) {
          ctl.announcementList[i].class = 'active';
        } else {
          ctl.announcementList[i].class = '';
        }
      }
      console.log('Announcement', ctl.announcementList);
    });
  }
  getBirthDate() {
    const ctl = this;
    this._spService.read('user information list').then(function (response) {
      console.log('user information list', response.d.results);
    });
  }
  onNavbarClick(route) {
    if (route === 'dashboard') {
      this._router.navigate(['/dashboard']);
    }

  }
  onSearch() {
    this._router.navigate(['/search', 'search']);
  }
}
