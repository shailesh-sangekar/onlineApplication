import { Component, OnInit } from '@angular/core';
import { AuthInfo } from '../../shared/models/authInfo';
import { AuthTokenService } from '../../shared/services/authToken.service';
import { CommonService } from '../../shared/services/common.service';
import { SpService } from '../../shared/services/spcommon.service';
import { TransportService } from '../../services/transport.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [SpService]
})
export class DashboardComponent implements OnInit {

  model: AuthInfo;
  loggedInUser: string;
  loginName: string;
  errorMessage: string;
  loggedInUserData: any;


  title = 'app';
  displayError = true;

  constructor(private _commonService: CommonService, private _authTokenService: AuthTokenService,
    private _transportService: TransportService, private _spService: SpService,
    private _router: Router) {
    this.model = new AuthInfo('password', '', '');
    this._spService.baseUrl = 'http://espld205:2233/';
  }

  submitTransportData() {
    this.displayError = false;
    console.log('submit function' + this.displayError);


  }

  ngOnInit() {
    this.loggedInUser = 'Ankit.panchal';
    this.loginName = 'Ankit.panchal';

     this.getTransport();
    // this.getAuthToken();
    // this._spService.read('ServiceConfig').then(function (response) {
    //   console.log(response.d.results);
    // });
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

  getTransport() {
    console.log('from transport');
    this._transportService.getTransport()
      .subscribe(
      (results: any) => {

        console.log('Transport Data');
        console.log(results);
      },
      error => {
        // debugger;
        this.errorMessage = <any>error;
        // this._router.navigate(['/unauthorized', 1]);
      });
  }

  onService(service: any, action: any, e: any) {
    e.preventDefault();
    this._router.navigate(['/user-list', service + '-' + action]);
  }
}
