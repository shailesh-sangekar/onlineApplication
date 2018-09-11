import { Component, OnInit } from '@angular/core';
import { AuthInfo } from '../../shared/models/authInfo';
import { AuthTokenService } from '../../shared/services/authToken.service';
import { CommonService } from '../../shared/services/common.service';
import { SpService } from '../../shared/services/spcommon.service';
import { TransportService } from '../../services/transport.service';
import { Router } from '@angular/router';

declare var $: any;

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

  lat: any = -20.168529;
  lng: any = 57.485452;
  lat1: any = -20.024509;
  lng1: any = 57.576280;
  lat2: any = -20.327520;
  lng2: any = 57.383162;
  lat3: any = -20.258659;
  lng3: any = 57.490749;

  title = 'app';
  displayError = true;

  constructor(private _commonService: CommonService, private _authTokenService: AuthTokenService,
    private _transportService: TransportService, private _spService: SpService,
    private _router: Router) {
    this.model = new AuthInfo('password', '', '');
    this._spService.baseUrl = 'https://chetanbadgujar.sharepoint.com';
  }

  submitTransportData() {
    this.displayError = false;
    console.log('submit function' + this.displayError);


  }

  ngOnInit() {
    this.loggedInUser = 'Ankit.panchal';
    this.loginName = 'Ankit.panchal';

    this.getDocuments();
    // this.getAuthToken();
    // this._spService.read('ServiceConfig').then(function (response) {
    //   console.log(response.d.results);
    // });

    $('.block-news').slick({
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 939,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            dots: true,
          }
        },
        {
          breakpoint: 719,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
          }
        }
      ]
    });
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

  getDocuments() {
    console.log('from transport');
    this._spService.read('Documents').then(function (response) {
      console.log(response.d.results);
    });
  }

  onService(service: any, action: any, e: any) {
    e.preventDefault();
    this._router.navigate(['/user-list', service + '-' + action]);
  }
}
