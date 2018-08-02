/* angular dependencies */
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import { Router } from '@angular/router';

/** Third party dependencies */
import { SpinnerService } from '../spinner/spinner.service';
import { Config } from '../config/config';
import { AuthHttp } from './authHttp.service';

@Injectable()
export class AuthTokenService {
    http: Http;
    authToken: any = '';
    loggedInUserData: any;
    loggedInUserName: any = '';
    loggedInUserRole: any;
    type: any = 'request';

    // Logo: any = 'assets/logo.png';
    // Image1 = 'assets/img1.jpg';
    // Image2 = 'assets/img2.jpg';
    // Image3 = 'assets/img3.jpg';

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
