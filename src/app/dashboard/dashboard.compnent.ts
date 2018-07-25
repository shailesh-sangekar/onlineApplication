import { Component, OnInit } from '@angular/core';
import { AuthInfo } from '../../shared/models/authInfo';
import { ServiceConfig } from '../../shared/models/serviceConfig';
import { AuthTokenService } from '../../shared/services/authToken.service';
import { CommonService } from '../../shared/services/common.service';
import { SpService } from '../../shared/services/spcommon.service';
import { TransportService } from '../../services/transport.service';
import { Router } from '@angular/router';


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

  constructor(private _spService: SpService, private _router: Router) {
    this.data = new Array<ServiceConfig>();
    // // TODO :: Delete Test Data
    const testD = new ServiceConfig();
    testD.Title = 'TransportService';
    testD.ListName = 'TransportList';
    testD.ServiceName = 'Transport Service';
    testD.Permissions = 'frci Members';
    testD.siteUrl = 'http://espld205:2233/transport/';
    this.data.push(testD);
    const testD1 = new ServiceConfig();
    testD1.Title = 'PassportService';
    testD1.ListName = 'TransportList';
    testD1.ServiceName = 'Passport Service';
    testD1.Permissions = 'frci Members';
    testD1.siteUrl = 'http://espld205:2233/transport/';
    this.data.push(testD1);
    // // END :: Delete Test Data
  }
  ngOnInit() {
    // this.getServiceData();
  }
  getServiceData() {
    const ctl = this;
    this._spService.read('ServiceConfig').then(function (response) {
      if (response.d.results !== null) {
        const res: any = response.d.results;
        res.forEach(element => {
          const tempData: ServiceConfig = new ServiceConfig();
          tempData.Title = element.Title;
          tempData.ListName = element.ListName;
          tempData.ServiceName = element.ServiceName;
          tempData.Permissions = element.Permissions;
          tempData.siteUrl = element.siteUrl;
          ctl.data.push(tempData);
        });
        console.log(ctl.data);
      }
    });
  }


}
