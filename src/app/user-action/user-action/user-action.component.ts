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

    model: AuthInfo;
    loggedInUser: string;
    loginName: string;
    errorMessage: string;
    loggedInUserData: any;
    params: Params;

    constructor(private _commonService: CommonService, private _authTokenService: AuthTokenService,
        private _transportService: TransportService, private _spService: SpService,
        private _router: Router, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            this.params = params['id'];
        });
    }
    onBack() {
        this._router.navigate(['/user-list/Trasport-Pending']);
    }
}
