import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { SpService } from '../../../shared/services/spcommon.service';
import { Config } from '../../../shared/config/config';
import { RestOptions } from '../../../shared/models/restoptions';

@Component({
    selector: 'app-job-offers',
    templateUrl: './job-details.component.html',
    styleUrls: ['./job-details.component.css'],
    providers: [SpService]
})
export class JobDetailsComponent implements OnInit {
    listName = 'JobOffersList';
    jobOffersList: Array<any>;
    jobDetails: any;
    params: string;
    options: RestOptions;
    url: any = '';
    constructor(private _spService: SpService, private _router: Router, private route: ActivatedRoute) {
        this._spService.baseUrl = this.url = Config.getRootURL();
    }

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            this.params = params['id'];
        });
        this.jobOffersList = new Array<any>();
        this.getJobOffer(this.params);
    }

    getJobOffers() {
        const svc = this;
        this._spService.read(this.listName).then(function (response) {
            svc.jobOffersList = response.d.results;
        }).catch(function (response) { console.log(response); });
    }
    getJobOffer(ID: string) {
        const _options: RestOptions = new RestOptions();
        _options.select = 'ID,Title,ExpiryDate,Company,JobDescription,Note,AttachmentFiles,'
            + 'AttachmentFiles/ServerRelativeUrl,AttachmentFiles/Name';
        _options.expand = 'AttachmentFiles';
        const svc = this;
        this._spService.readItem(this.listName, ID, _options).then(function (response) {
            svc.jobDetails = response.d;
        }).catch(function (response) { console.log(response); });
    }
}
