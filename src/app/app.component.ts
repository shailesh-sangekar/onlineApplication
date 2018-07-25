import { Component, OnInit } from '@angular/core';
import { AuthInfo } from '../shared/models/authInfo';
import { User } from '../shared/models/User';
import { AuthTokenService } from '../shared/services/authToken.service';
import { CommonService } from '../shared/services/common.service';
import { SpService } from '../shared/services/spcommon.service';
import { TransportService } from '../services/transport.service';
import { Config } from '../shared/config/config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SpService]
})
export class AppComponent implements OnInit {

  model: AuthInfo;
  loggedInUser: string;
  loginName: string;
  errorMessage: string;
  loggedInUserData: any;
  root: string;
  currentUser: User;

  title = 'app';
  displayError = true;

  constructor(private _commonService: CommonService, private _authTokenService: AuthTokenService,
    private _transportService: TransportService, private _spService: SpService) {
    this.model = new AuthInfo('password', '', '');
    this.currentUser = new User();
    this.root = Config.GetRoot();
  }

  submitTransportData() {
    this.displayError = false;
    console.log('submit function' + this.displayError);
  }

  ngOnInit() {
    this.loggedInUser = 'Ankit.panchal';
    this.loginName = 'Ankit.panchal';
    this._spService.setBaseUrl(this.root);
    // this.getUserDetails();
  }

  getUserDetails() {
    const _this = this;
    this._spService.getCurrentUser().then(function (response) {
      if (response != null) {
        const _user = response.d;
        _this.currentUser.Title = _user.Title;
        _this.currentUser.LoginName = _user.LoginName;
        _this.currentUser.Email = _user.Email;
        _this.currentUser.Groups = _user.Groups.results.map(g => g.Title);
        console.log('My profile response');
        console.log(_this.currentUser);
      }
    });
  }

  //// TODO :: FOR Front End form
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
  //// TODO :: FOR Front End form
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

}
