import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthInfo } from '../../../shared/models/authInfo';
import { AuthTokenService } from '../../../shared/services/authToken.service';
import { CommonService } from '../../../shared/services/common.service';
import { SpService } from '../../../shared/services/spcommon.service';
import { TransportService } from '../../../services/transport.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  providers: [SpService]
})
export class UserlistComponent implements OnInit {

  model: AuthInfo;
  loggedInUser: string;
  loginName: string;
  errorMessage: string;
  loggedInUserData: any;
  params: Params;
  service: any = '';
  action: any = '';
  serviceUrl: string;
  serviceList: string;
  data: any;

  cars: Array<Car>;

  cols: any[];

  constructor(private _commonService: CommonService, private _authTokenService: AuthTokenService,
    private _transportService: TransportService, private _spService: SpService,
    private _router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.params = params['id'];
      this.service = this.params ? this.params.split('-')[0] : '';
      this.action = this.params ? this.params.split('-')[1] : '';
      this.serviceUrl = params['url'];
      this.serviceList = params['list'];
      console.log(this.serviceList + ' Url : ' + this.serviceUrl);
    });
    this._spService.setBaseUrl(this.serviceUrl);
    // this.getListData(this.serviceList);
    this.cars = new Array<Car>();
    let tempData = new Car();
    tempData.vin = 'MH8938';
    tempData.color = 'VVhite';
    tempData.brand = 'HND';
    tempData.year = '2016';
    this.cars.push(tempData);
    let tempData1 = new Car();
    tempData1.vin = 'MH8938';
    tempData1.color = 'VVhite';
    tempData1.brand = 'HND';
    tempData1.year = '2016';
    this.cars.push(tempData1);
    this.cols = [
      { field: 'vin', header: 'Vin' },
      { field: 'year', header: 'Year' },
      { field: 'brand', header: 'Brand' },
      { field: 'color', header: 'Color' }
    ];

    console.log(this.cars);
    console.log(this.cols);
  }

  getListData(ListName: string) {
    const ctl = this;
    this._spService.read(ListName).then(function (response) {
      if (response.d.results !== null) {
        ctl.data = response.d.results;
        console.log(ctl.data);
      }
    }).catch(function (response) {
      console.error('Wrong communication Occured at getData');
      console.error(response);
    });
  }

  onUpdateRequest() {
    this._router.navigate(['/user-action', 1]);
  }
}

export class Car {
  public vin: string;
  public year: string;
  public brand: string;
  public color: string;
}
