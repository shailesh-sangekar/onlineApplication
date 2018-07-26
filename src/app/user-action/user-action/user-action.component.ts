import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthInfo } from '../../../shared/models/authInfo';
import { AuthTokenService } from '../../../shared/services/authToken.service';
import { CommonService } from '../../../shared/services/common.service';
import { SpService } from '../../../shared/services/spcommon.service';
import { TransportService } from '../../../services/transport.service';


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
    updates: RequestData;
    constructor(private _commonService: CommonService, private _authTokenService: AuthTokenService,
        private _transportService: TransportService, private _spService: SpService,
        private _router: Router, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.fields = new Array<any>();
        this.mappedData = new Array<FieldValue>();
        this.updates = new RequestData();
        this.route.params.forEach((params: Params) => {
            this.requestId = params['id'];
            this.serviceUrl = params['url'];
            this.serviceList = params['list'];
        });
        this._spService.setBaseUrl(this.serviceUrl);
        this.getAllFields(this.serviceList);
        this.getRequestData(this.serviceList, this.requestId);
    }
    onBack() {
        this._router.navigate(['/user-list/Trasport-Pending']);
    }
    getAllFields(ListName: string) {
        const ctl = this;
        this._spService.getAllCustomFields(ListName).then(function (response) {
            if (response.d.results !== null) {
                console.log('All Fields from actions');
                ctl.fields = response.d.results;
                console.log(response.d.results);
            }
        });
    }

    getRequestData(ListName: string, id: string) {
        const ctl = this;
        this._spService.readItem(ListName, id).then(function (response) {
            if (response !== null) {
                ctl.data = response.d;
                console.log('Resulted Data from actions');
                console.log(ctl.data);
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
        this.update(this.serviceList, this.requestId, this.updates);
    }

}
export class FieldValue {
    public Label: string;
    public Value: string;
}

export class RequestData {
    public Status: string;
    public Title: string;
}

