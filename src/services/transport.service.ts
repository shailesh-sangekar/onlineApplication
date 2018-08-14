/* angular dependencies */
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
// import { Router } from '@angular/router';

/** Third party dependencies */
import { SpinnerService } from '../shared/spinner/spinner.service';
import { Config } from '../shared/config/config';
import { AuthHttp } from '../shared/services/authHttp.service';
import { AuthTokenService } from '../shared/services/authToken.service';

@Injectable()
export class TransportService {
    http: Http;
    constructor(http: Http,
        private authHttp: AuthHttp,
        private _spinnerService: SpinnerService,
        // private router: Router,
        private _authTokenService: AuthTokenService) {
        this.http = http;
    }

    getTransport() {
        const url = Config.GetURL('/api/FRCI/Transport/Get');
        this._spinnerService.show();
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }
    addTransport(payload: any) {
        const url = Config.GetURL('/api/FRCI/Transport/Post');
        this._spinnerService.show();
        return this.authHttp.post(url, payload)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }
    updateTransport(payload: any) {
        const url = Config.GetURL('/api/FRCI/Transport/UpdateTransportByID');
        this._spinnerService.show();
        return this.authHttp.post(url, payload)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }
    getTransportByID(id: any) {
        const url = Config.GetURL('/api/FRCI/Transport/TransportByID/' + id);
        this._spinnerService.show();
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }
    getTransportByStatus(Status: string) {
        const url = Config.GetURL('/api/FRCI/Transport/TransportByStatus?Status=' + Status);
        this._spinnerService.show();
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }
    getTransportCountByStatus(Status: string) {
        const url = Config.GetURL('/api/FRCI/Transport/TransportCountByStatus?Status=' + Status);
        this._spinnerService.show();
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    ValidateRegistrationMark(RegistrationMark: string) {
        const url = Config.GetURL('/api/FRCI/Transport/IsRegistrationAvailable?RegistrationMark=' + RegistrationMark);
        this._spinnerService.show();
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }
    getRegistrationRule(status: string, year: string) {
        const url = Config.GetURL('/api/FRCI/RegistrationRule/RuleByStatusAndYear?Status=' + status + '&Year=' + year);
        this._spinnerService.show();
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }
    searchMarks(Prefix: string, From: string, To: string) {
        const url = Config.GetURL('/api/FRCI//Transport/Search?Prefix=' + Prefix + '&FromNumber=' + From + '&ToNumber=' + To);
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
