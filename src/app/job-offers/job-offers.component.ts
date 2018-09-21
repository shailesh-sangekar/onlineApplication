import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { SpService } from '../../shared/services/spcommon.service';
import { Config } from '../../shared/config/config';

@Component({
    selector: 'app-job-offers',
    templateUrl: './job-offers.component.html',
    styleUrls: ['./job-offers.component.css'],
    providers: [SpService]
})
export class JobOffersComponent implements OnInit {
    listName = 'JobOffersList';
    jobOffersList: Array<any>;

    constructor(private _spService: SpService, private _router: Router) {
        this._spService.baseUrl = Config.getRootURL();
    }

    ngOnInit() {
        this.jobOffersList = new Array<any>();
        this.getJobOffers();
    }
    onDetails(offer: any) {
        this._router.navigate(['/job-details', offer.ID]);
    }
    getJobOffers() {
        const svc = this;
        this._spService.read(this.listName).then(function (response) {
            svc.jobOffersList = response.d.results;
        }).catch(function (response) { console.log(response); });
    }
}
