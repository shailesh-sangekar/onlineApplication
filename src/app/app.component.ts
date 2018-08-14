import { Component, OnInit } from '@angular/core';
import { AuthInfo } from '../shared/models/authInfo';
import { AuthTokenService } from '../shared/services/authToken.service';
import { CommonService } from '../shared/services/common.service';
import { SpService } from '../shared/services/spcommon.service';
import { TransportService } from '../services/transport.service';
import { MembersService } from '../services/members.service';
import { Config } from '../shared/config/config';
import { User } from '../shared/models/User';

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
  currentUser: User;

  title = 'app';
  displayError = true;

  constructor(private _commonService: CommonService, private _authTokenService: AuthTokenService,
    private _transportService: TransportService, private _spService: SpService) {
    this.model = new AuthInfo('password', '', '');
    this._spService.baseUrl = Config.getRootURL();
  }

  submitTransportData() {
    this.displayError = false;
    console.log('submit function' + this.displayError);
    this.currentUser = new User();

  }

  ngOnInit() {
    this.loggedInUser = 'Ankit.panchal';
    this.loginName = 'Ankit.panchal';

    this.getAuthToken();
   // this.getCurrentUser();
    // this.getTransport();
    // this.getMemberDetails('TestLoginName');
  }

  getAuthToken() {

    this.model.UserName = this.loginName;
    this.model.Password = 'Espl@123';
    this._commonService.getAuthToken(this.model)
      .subscribe(
        (results: any) => {
          // console.log('Access grated for current user');
          // console.log(results);
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
  getCurrentUser() {
    const _this = this;
    this._spService.getCurrentUser().then(function (response) {
      if (response != null) {
        const _user = response.d;
        let _currentUser: User = new User();
        _currentUser.Title = _user.Title;
        _currentUser.LoginName = _user.LoginName;
        _currentUser.Email = _user.Email;
        _currentUser.Groups = _user.Groups.results.map(g => g.Title);
        localStorage.setItem('user', JSON.stringify(_currentUser));
      }
    });
  }

}
