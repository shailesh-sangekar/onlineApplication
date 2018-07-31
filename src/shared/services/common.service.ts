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
import { SpinnerService } from '../spinner/spinner.service';
import { Config } from '../config/config';
import { AuthHttp } from './authHttp.service';
import { AuthInfo } from '../models/authInfo';
import { AuthTokenService } from './authToken.service';

@Injectable()
export class CommonService {
    http: Http;
    VCID: any = '';
    constructor(http: Http,
        private authHttp: AuthHttp,
        private _spinnerService: SpinnerService,
        // private router: Router,
        private _authTokenService: AuthTokenService) {
        this.http = http;
    }
    onTitleClick() {
        // this.router.navigate(['/brand']);
    }
    getCurrentQurter(): string {
        const __dt = new Date();
        return 'Q' + Math.floor((__dt.getMonth() / 3)).toString() + ' ' + __dt.getFullYear();
    }

    private convertToCSV(objArray: any) {
        const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
        array[0].splice(array[0].indexOf('__metadata'), 1);
        array[0].splice(array[0].indexOf('ContentType'), 1);
        array[0].splice(array[0].indexOf('Attachments'), 1);
        let str = array[0].toString() + '\r\n';
        for (let i = 1; i < array.length; i++) {
            let line = '';
            array[0].forEach(index => {
                if (line !== '') { line += ','; }
                line += array[i][index];
            });
            str += line + '\r\n';
        }
        return str;
    }

    exportCSVFile(headers: any, items: any, fileTitle: any) {
        if (headers) {
            items.unshift(headers);
        }

        // Convert Object to JSON
        const jsonObject = JSON.stringify(items);

        const csv = this.convertToCSV(jsonObject);

        const exportedFilenmae = fileTitle + '.csv' || 'export.csv';

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, exportedFilenmae);
        } else {
            const link = document.createElement('a');
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                const url = URL.createObjectURL(blob);
                link.setAttribute('href', url);
                link.setAttribute('download', exportedFilenmae);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    }

    // END call the exportCSVFile() function to process the JSON and trigger the download



    // Get user auth token
    getAuthToken(credentials: AuthInfo) {
        const authenticateUrl = Config.GetURL('/api/Auth/Token');
        this._spinnerService.show();
        const headers = new Headers();
        const credentialString: string = 'grant_type=password&username=' + credentials.UserName + '&password=' + credentials.Password;
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        const options = new RequestOptions({ headers: headers });
        return this.http.post(authenticateUrl, credentialString, options)
            .map((res: Response) => {
                this.setToken(res); // this.emitAuthEvent(true);
            })
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }

    // Get Logged In User Data
    getLoggedInUserDetails(username: any) {
        const url = Config.GetURL('/api/UGP/GetUGPDetailsByUserName?userName=' + username);
        this._spinnerService.show();
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }
    getAssignToUsers(username: string) {
        const url = Config.GetURL('/api/UGP/GetUserDetailsByName?userName=' + username);
        this._spinnerService.show();
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }
    getBrand() {
        const url = Config.GetURL('/api/Brands/Get');
        this._spinnerService.show();
        return this.authHttp.get(url)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }
    addBrand(payload: any) {
        const url = Config.GetURL('/api/Brands/Post');
        this._spinnerService.show();
        return this.authHttp.post(url, payload)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }
    updateBrand(payload: any) {
        const url = Config.GetURL('/api/Brands/UpdateBrandByID');
        this._spinnerService.show();
        return this.authHttp.post(url, payload)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }
    deleteBrand(value: any) {
        const url = Config.GetURL('/api/Brands/DeleteBrandByID/' + value.ID);
        this._spinnerService.show();
        return this.authHttp.post(url, value)
            .map(this.extractData)
            .catch(this.handleError)
            .finally(() => this._spinnerService.hide());
    }
    /**Set Token in localstorage */
    private setToken(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        const body = res.json();
        this._authTokenService.authToken = body.access_token;
        // sessionStorage.setItem('access_token', body.access_token);
        return body || {};
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
