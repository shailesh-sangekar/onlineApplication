import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RestOptions, SpService, CommonService } from '../../../shared';
import { ServiceRequest } from '../';

@Component({
  selector: 'app-user-list',
  templateUrl: 'user-list.component.html',
  styleUrls: ['user-list.component.css'],
  providers: [SpService]
})
export class UserlistComponent implements OnInit {

  params: Params;
  service: any = '';
  action: any = '';
  serviceUrl: string;
  serviceList: string;
  data: Array<ServiceRequest>;
  options: RestOptions;
  fields: string;
  constructor(private _spService: SpService, private _commonservice: CommonService,
    private _router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.params = params['id'];
      this.service = this.params ? this.params.split('-')[0] : '';
      this.action = this.params ? this.params.split('-')[1] : '';
      this.serviceUrl = params['url'];
      this.serviceList = params['list'];
    });
    this._spService.setBaseUrl(this.serviceUrl);
    this.init();
    this.getAllFields(this.serviceList);
    this.getListData(this.serviceList, this.options);
  }
  private init() {
    this.options = new RestOptions();
    this.options.select = 'ID,SID,NIC,FirstName,FamilyName,Address,CountryOfResidence,MobileNumber,Status,Created,Modified';
    this.options.orderby = 'ID desc';
    this.options.filter = 'Status eq \'' + this.action + '\'';
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
  getListData(ListName: string, Options?: RestOptions) {
    const ctl = this;
    if (this.options != null) {
      this._spService.read(ListName, Options).then(function (response) {
        if (response.d.results !== null) {
          ctl.data = response.d.results;
        }
      }).catch(function (response) {
        console.log('Wrong communication Occured at getData');
        console.error(response);
      });
    } else {
      this._spService.read(ListName).then(function (response) {
        if (response.d.results !== null) {
          ctl.data = response.d.results;
        }
      }).catch(function (response) {
        console.log('Wrong communication Occured at getData');
        console.error(response);
      });
    }
  }

  onUpdateRequest(id: string) {
    this._router.navigate(['/user-action', id, this.serviceUrl, this.serviceList, this.service + '-' + this.action]);
  }

  export() {
    const _options = new RestOptions();
    _options.select = this.fields;
    _options.orderby = 'ID desc';
    _options.filter = 'Status eq \'' + this.action + '\'';
    this.getData(this.serviceList, _options);
  }
  getData(ListName: string, Options?: RestOptions) {
    const ctl = this;
    this._spService.read(ListName, Options).then(function (response) {
      if (response.d.results !== null) {
        const _data: Array<any> = response.d.results;
        const _headers: any = Object.getOwnPropertyNames(_data[0]);
        const _dataToExport = JSON.parse(JSON.stringify(_data));
        const _currentDate = new Date();
        const _fileName: string = ctl.service + ' ' + ctl.action + ' Requests On ' + _currentDate.toDateString();
        ctl._commonservice.exportCSVFile(_headers, _dataToExport, _fileName);
      }
    }).catch(function (response) {
      console.log('Wrong communication Occured at getData');
      console.error(response);
    });
  }
  getAllFields(ListName: string) {
    const ctl = this;
    this._spService.getAllCustomFields(ListName).then(function (response) {
      if (response.d.results !== null) {
        ctl.fields = response.d.results.map(x => x.InternalName).toString();
      }
    });
  }
}

