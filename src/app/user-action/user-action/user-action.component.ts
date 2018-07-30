import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SpService } from '../../../shared';
import { FieldValue, PostData } from '../';


@Component({
    selector: 'app-users-action',
    templateUrl: './user-action.component.html',
    styleUrls: ['./user-action.component.css'],
    providers: [SpService]
})
export class UserActionComponent implements OnInit {
    params: Params;
    requestId: string;
    serviceUrl: string;
    serviceList: string;
    data: any;
    fields: Array<any>;
    mappedData: Array<FieldValue>;
    comments: string;
    action: string;
    updates: PostData;
    constructor(
        private _spService: SpService,
        private _router: Router, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.fields = new Array<any>();
        this.mappedData = new Array<FieldValue>();
        this.updates = new PostData();
        this.route.params.forEach((params: Params) => {
            this.requestId = params['id'];
            this.serviceUrl = params['url'];
            this.serviceList = params['list'];
            this.action = params['action'];
        });
        this._spService.setBaseUrl(this.serviceUrl);
        this.getAllFields(this.serviceList);
        this.getRequestData(this.serviceList, this.requestId);
    }
    onBack() {
        // this._router.navigate(['/user-list/Trasport-Pending']);
        this._router.navigate(['/user-list',
            this.action,
            this.serviceUrl,
            this.serviceList
        ]);
    }
    getAllFields(ListName: string) {
        const ctl = this;
        this._spService.getAllCustomFields(ListName).then(function (response) {
            if (response.d.results !== null) {
                ctl.fields = response.d.results;
            }
        });
    }

    getRequestData(ListName: string, id: string) {
        const ctl = this;
        this._spService.readItem(ListName, id).then(function (response) {
            if (response !== null) {
                ctl.data = response.d;
                ctl.mapValues(ctl.data, ctl);
            }
        });
    }
    mapValues(data: any, __this: any) {
        this.fields.forEach(field => {
            if (field.InternalName !== 'ContentType') {
                const tempField: FieldValue = new FieldValue();
                tempField.Label = field.Title;
                tempField.Value = data[field.InternalName];
                __this.mappedData.push(tempField);
            }
        });
    }

    update(ListName: string, id: string, data: any) {
        const ctl = this;
        this._spService.update(ListName, id, data).then(function (response) {
            if (response !== null) {
                console.log('Data Is Updated');
            }
        });
    }
    onUpdate(status: string) {
        // const tempData = '{\'Status\': \'' + status + '\',\'Title\': \'' + this.comments + '\'}';
        this.updates.Status = status;
        this.update(this.serviceList, this.requestId, { 'Title': 'Testing only title field' });
    }

}




