import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SpService } from '../../shared/services/spcommon.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Config } from '../../shared/config/config';
import { RestOptions } from '../../shared/models/restoptions';
import * as _ from 'lodash/index';

@Component({
    selector: 'app-special-offer',
    templateUrl: './special-offer.component.html',
    styleUrls: ['./special-offer.component.css'],
    providers: [SpService]
})
export class SpecialOfferComponent implements OnInit {
    pdfUrl: any;
    params: Params;
    url: any = '';
    options: RestOptions;
    specialOfferList: any;
    constructor(private _spService: SpService,
        private _router: Router, private route: ActivatedRoute,
        private domSanitizer: DomSanitizer) {
        this.url = Config.getRootURL();
        this.specialOfferList = [];
        // this._spService.baseUrl = 'https://alphaportal.sharepoint.com/sites/ibl';
    }

    ngOnInit() {
        this.getSpecialOffer();
    }
    getSpecialOffer() {
        const ctl = this;
        // this._spService.readDocument('Special Offer', this.options).then(function (response) {
        //     console.log('Special Offer Doc', response.d.results);
        //     ctl.specialOfferList = response.d.results;
        // });
        this._spService.read('Special Offer', this.options).then(function (response) {
            console.log('Special Offer List', response.d.results);
            ctl.specialOfferList = response.d.results;
        });
    }
    onBack() {
        this._router.navigate(['/user-list/Trasport-Pending']);
    }
}
