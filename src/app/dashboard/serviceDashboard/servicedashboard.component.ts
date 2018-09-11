import { Component, OnInit, Input } from '@angular/core';
import { ServiceConfig, SpService } from '../../../shared';
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
    chartdata: any;
    chartOptions: any;
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
        this.bindChart([this.pendingReq, this.approvedReq, this.rejectedReq]);
    }

    onService(service: any, action: any, e: any) {
        e.preventDefault();
        this._router.navigate(['/user-list',
            this.serviceRef.ServiceName + '-' + action,
            this.serviceRef.siteUrl,
            this.serviceRef.ListName
        ]);

    }
    bindChart(_data: Array<number>) {
        const countpen = Math.round((this.pendingReq / parseInt(this.testMessage, 0) * 100)) + '% Pending';
        const countap = Math.round((this.approvedReq / parseInt(this.testMessage, 0) * 100)) + '% Closed';
        const countre = Math.round((this.rejectedReq / parseInt(this.testMessage, 0) * 100)) + '% Rejected';
        this.chartOptions = {
            legend: { display: true, position: 'right' },
            animation: {
                duration: 1500
            }
        },
            this.chartdata = {
                labels: [countpen, countap, countre],
                datasets: [
                    {
                        data: _data,
                        backgroundColor: ['#ffb822', '#00c5dc', '#f72e4f'],
                        hoverBackgroundColor: ['#ffb822', '#00c5dc', '#f72e4f'/**red-'#f4516c'| purple-'#716aca'*/]
                    }]
            };
    }
}
