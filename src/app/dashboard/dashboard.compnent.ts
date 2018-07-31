import { Component, OnInit } from '@angular/core';
import { SpService } from '../../shared/services/spcommon.service';
import { Router } from '@angular/router';
import { RestOptions, ServiceConfig, User, CommonService } from '../../shared';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['dashboard.component.css'],
  providers: [SpService]
})
export class DashboardComponent implements OnInit {
  data: Array<ServiceConfig>;
  title = 'app';
  displayError = true;
  options: RestOptions;
  quarter: string;
  NoDataMsg = false;
  constructor(private _commonService: CommonService, private _spService: SpService, private _router: Router) {
    this.data = new Array<ServiceConfig>();
    // // TODO :: Delete Test Data
    // const testD = new ServiceConfig();
    // testD.Title = 'TransportService';
    // testD.ListName = 'TransportList';
    // testD.ServiceName = 'Transport Service';
    // testD.Permissions = 'frci Members';
    // testD.siteUrl = 'http://espld205:2233/transport/';
    // this.data.push(testD);
    // const testD1 = new ServiceConfig();
    // testD1.Title = 'PassportService';
    // testD1.ListName = 'TransportList';
    // testD1.ServiceName = 'Passport Service';
    // testD1.Permissions = 'frci Members';
    // testD1.siteUrl = 'http://espld205:2233/transport/';
    // this.data.push(testD1);
    // // END :: Delete Test Data
  }
  ngOnInit() {
    this.init();
    this.getServiceData();
  }
  private init() {
    const __dt = new Date();
    const userGroup: User = JSON.parse(localStorage.getItem('user'));
    this.quarter = this._commonService.getCurrentQurter();
    this.options = new RestOptions();
    this.options.select = 'ID,Title,ServiceName,ListName,Permissions/ID,Permissions/Name,siteUrl,Created,Modified';
    this.options.orderby = 'ID desc';
    this.options.expand = 'Permissions';
  }
  getServiceData() {
    const ctl = this;
    this._spService.read('ServiceConfig', this.options).then(function (response) {
      if (response.d.results !== null) {
        const userGroup: User = JSON.parse(localStorage.getItem('user'));
        const res: any = response.d.results;
        res.forEach(element => {
          const tempData: ServiceConfig = new ServiceConfig();
          tempData.Title = element.Title;
          tempData.ListName = element.ListName;
          tempData.ServiceName = element.ServiceName;
          tempData.Permissions = element.Permissions;
          tempData.siteUrl = element.siteUrl;
          // ctl.data.push(tempData);
          if (userGroup.Groups.indexOf(element.Permissions.Name) > -1) {
            ctl.data.push(tempData);
          }
        });
        if (ctl.data.length === 0) {
          ctl.NoDataMsg = true;
        }
      }
    });
  }


}
