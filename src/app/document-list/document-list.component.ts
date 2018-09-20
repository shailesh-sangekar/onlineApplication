import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SpService } from '../../shared/services/spcommon.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Config } from '../../shared/config/config';
import { RestOptions } from '../../shared/models/restoptions';
import * as _ from 'lodash/index';

@Component({
    selector: 'app-document-list',
    templateUrl: './document-list.component.html',
    styleUrls: ['./document-list.component.css'],
    providers: [SpService]
})
export class DocumentListComponent implements OnInit {
    pdfUrl: any;
    params: Params;
    url: any = '';
    options: RestOptions;
    documentList: any;
    NoticeOfMeeting: any;
    proxyList: any;
    financialDoc: any;
    showNotice: any = true;
    showProxy: any = true;
    showFinance: any = true;
    constructor(private _spService: SpService,
        private _router: Router, private route: ActivatedRoute,
        private domSanitizer: DomSanitizer) {
        this.url = Config.getRootURL();
        this.documentList = [];
        this.NoticeOfMeeting = [];
        this.proxyList = [];
        this.financialDoc = [];
        // this._spService.baseUrl = 'https://alphaportal.sharepoint.com/sites/ibl';
    }

    ngOnInit() {
        this.getDocumentList();
    }
    getDocumentList() {
        const ctl = this;
        // this._spService.readDocument('Special Offer', this.options).then(function (response) {
        //     console.log('Special Offer Doc', response.d.results);
        //     ctl.specialOfferList = response.d.results;
        // });
        this.options = new RestOptions();
        this.options.select = 'LinkFilename,*';
        this._spService.read('Documents', this.options).then(function (response) {
            console.log('Documents List', response.d.results);
            ctl.documentList = response.d.results;
            ctl.NoticeOfMeeting = _.filter(ctl.documentList, function (o) { return o.category === 'Notice of Meeting'; });
            ctl.proxyList = _.filter(ctl.documentList, function (o) { return o.category === 'Proxy'; });
            ctl.financialDoc = _.filter(ctl.documentList, function (o) { return o.category === 'Financial Documents'; });
        });
    }
    onSearchByCategory(category) {
        switch (category) {
            case '': this.showNotice = true;
                this.showProxy = true;
                this.showFinance = true;
                break;
            case 'Notice of Meeting': this.showNotice = true;
                this.showProxy = false;
                this.showFinance = false;
                break;
            case 'Proxy': this.showNotice = false;
                this.showProxy = true;
                this.showFinance = false;
                break;
            case 'Financial Documents': this.showNotice = false;
                this.showProxy = false;
                this.showFinance = true;
                break;
        }
    }
}
