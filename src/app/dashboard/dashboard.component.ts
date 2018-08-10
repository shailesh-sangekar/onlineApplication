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
  }
  ngOnInit() {
  }
  newRequest(e: any) {
    e.preventDefault();
    this._router.navigate(['/new-request']);
  }
}
