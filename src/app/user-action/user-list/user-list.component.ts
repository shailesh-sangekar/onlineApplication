import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthInfo } from '../../../shared/models/authInfo';
import { AuthTokenService } from '../../../shared/services/authToken.service';
import { CommonService } from '../../../shared/services/common.service';
import { SpService } from '../../../shared/services/spcommon.service';
import { TransportService } from '../../../services/transport.service';
import { RestOptions } from '../../../shared/models/restoptions';
import { ServiceRequest } from './serviceRequest';

@Component({
  selector: 'app-user-list',
  templateUrl: 'user-list.component.html',
  styleUrls: ['user-list.component.css'],
  providers: [SpService]
})
export class UserlistComponent implements OnInit {

  // model: AuthInfo;
  // loggedInUser: string;
  // loginName: string;
  // errorMessage: string;
  // loggedInUserData: any;
  params: Params;
  service: any = '';
  action: any = '';
  serviceUrl: string;
  serviceList: string;
  data: Array<ServiceRequest>;
  options: RestOptions;

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
    this.init();
    this.getListData(this.serviceList);
    // this.getAllFields(this.serviceList);
  }
  private init() {
    this.options = new RestOptions();
    this.options.select = 'ID,SID,NIC,FirstName,FamilyName,Address,CountryOfResidence,MobileNumber,Status,Created,Modified';
    this.options.orderby = 'ID desc';
    this.data = Array<ServiceRequest>();
    // for (let i = 1; i <= 100; i++) {
    //   let tempData = new ServiceRequest();
    //   tempData.SID = 'MH8938-' + i;
    //   tempData.NIC = i + 'VVhite';
    //   tempData.FirstName = 'HND';
    //   tempData.FamilyName = 'HNDFamily';
    //   tempData.Address = '2016';
    //   tempData.CountryOfResidence = 'CNT2016';
    //   tempData.MobileNumber = '5612016';
    //   this.data.push(tempData);
    //   let tempData1 = new ServiceRequest();
    //   tempData1.SID = 'MH89381';
    //   tempData1.NIC = 'VVhite1';
    //   tempData1.FirstName = 'HND1';
    //   tempData1.FamilyName = 'HNDFamily1';
    //   tempData1.Address = '20161';
    //   tempData1.CountryOfResidence = 'CNT20161';
    //   tempData1.MobileNumber = '15612016';
    //   this.data.push(tempData1);
    // }
    // let tempData1 = new ServiceRequest();
    // tempData1.SID = 'MH3752';
    // tempData1.NIC = 'VVhite1';
    // tempData1.FirstName = 'HND1';
    // tempData1.FamilyName = 'HNDFamily1';
    // tempData1.Address = '20161';
    // tempData1.CountryOfResidence = 'CNT20161';
    // tempData1.MobileNumber = '15612016';
    // this.data.push(tempData1);
  }
  getAllFields(ListName: string) {
    const ctl = this;
    this._spService.getAllCustomFields(ListName).then(function (response) {
      if (response.d.results !== null) {
        console.log('All Fields');
        console.log(response.d.results);
      }
    });
  }
  getListData(ListName: string, Options?: RestOptions) {
    const ctl = this;
    if (this.options != null) {
      this._spService.read(ListName, Options).then(function (response) {
        if (response.d.results !== null) {
          ctl.data = response.d.results;
          console.log(ctl.data);
        }
      }).catch(function (response) {
        console.log('Wrong communication Occured at getData');
        console.error(response);
      });
    } else {
      this._spService.read(ListName).then(function (response) {
        if (response.d.results !== null) {
          ctl.data = response.d.results;
          console.log(ctl.data);
        }
      }).catch(function (response) {
        console.log('Wrong communication Occured at getData');
        console.error(response);
      });
    }
  }

  onUpdateRequest(id: string) {
    this._router.navigate(['/user-action', id, this.serviceUrl, this.serviceList]);
  }
}

