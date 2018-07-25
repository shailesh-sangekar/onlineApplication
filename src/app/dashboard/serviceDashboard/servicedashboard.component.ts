import { Component, OnInit, Input } from '@angular/core';
import { AuthInfo } from '../../../shared/models/authInfo';
import { ServiceConfig } from '../../../shared/models/serviceConfig';
import { AuthTokenService } from '../../../shared/services/authToken.service';
import { CommonService } from '../../../shared/services/common.service';
import { SpService } from '../../../shared/services/spcommon.service';
import { TransportService } from '../../../services/transport.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-service-dashboard',
    templateUrl: './servicedashboard.component.html',
    providers: [SpService]
})
export class ServiceDashboardComponent implements OnInit {
    @Input('ServiceInfo') serviceRef: ServiceConfig;
    testMessage: string;
    loggedInUserData: any;
    data: Array<ServiceConfig>;
    serviceData: Array<any>;
    pendingReq: number;
    approvedReq: number;
    rejectedReq: number;
    constructor(private _spService: SpService, private _router: Router) {
        this.data = new Array<ServiceConfig>();
        this.serviceData = new Array<any>();
    }

    ngOnInit() {
        // this._spService.baseUrl = this.serviceRef.siteUrl;
        this._spService.setBaseUrl(this.serviceRef.siteUrl);
        this.getData(this.serviceRef.ListName);
    }
    getData(ListName: string) {
        const ctl = this;
        this._spService.read(ListName).then(function (response) {
            if (response.d.results !== null) {
                ctl.serviceData = response.d.results;
                ctl.testMessage = ctl.serviceData.length.toString();
                ctl.getStatusCounter(ctl.serviceData);
            }
        }).catch(function (response) {
            console.error('Wrong communication Occured at getData');
            console.error(response);
        });
    }

    getStatusCounter(__data: Array<any>) {
        const ctl = this;
        const _pending = __data.filter(d => d.Status === 'Pending');
        const _approved = __data.filter(d => d.Status === 'Approved');
        const _rejected = __data.filter(d => d.Status === 'Rejected');

        ctl.pendingReq = _pending.length;
        ctl.approvedReq = _approved.length;
        ctl.rejectedReq = _rejected.length;
    }

    onService(service: any, action: any, e: any) {
        e.preventDefault();
        this._router.navigate(['/user-list',
            service + '-' + action,
            this.serviceRef.siteUrl,
            this.serviceRef.ListName
        ]);

    }
}
