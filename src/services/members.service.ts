/* angular dependencies */
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';

/** Third party dependencies */
import { SpinnerService } from '../shared/spinner/spinner.service';
import { Config } from '../shared/config/config';
import { AuthHttp } from '../shared/services/authHttp.service';
import { AuthTokenService } from '../shared/services/authToken.service';

@Injectable()
export class MembersService {
    http: Http;
    constructor(http: Http,
        private authHttp: AuthHttp,
        private _spinnerService: SpinnerService,
        private _authTokenService: AuthTokenService) {
        this.http = http;
    }

    getMembers() {
        const url = Config.GetMemberURL('/api/members');
        this._spinnerService.show();
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }
    getDetails(UserName: any) {
        const url = Config.GetMemberURL('/api/FRCI/Members/GetByLoginName?LoginName=' + UserName);
        this._spinnerService.show();
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }
    getDetailsByName(FirstName: string, FamilyName: string) {
        const url = Config.GetMemberURL('/api/FRCI/Transport/GetMembersPeronalDetails?FName=' + FirstName + '&LName=' + FamilyName);
        this._spinnerService.show();
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }
    /**Success Handler */
    private extractData(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        const body = res.json();
        return body || {};
    }

    /**Error Handler */
    private handleError(error: Response) {
        console.log(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}
