import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SpService } from '../../shared/services/spcommon.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Config } from '../../shared/config/config';
import { RestOptions } from '../../shared/models/restoptions';
import { DocumentSearchPipe } from '../../shared/pipes/docsearch-pipe';
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
    finalList: any;
    showNotice: any = true;
    showProxy: any = true;
    showFinance: any = true;
    searchString: any;
    constructor(private _spService: SpService,
        private _router: Router, private route: ActivatedRoute,
        private domSanitizer: DomSanitizer) {
        this.url = Config.getRootURL();
        this.documentList = [];
        this.NoticeOfMeeting = [];
        this.proxyList = [];
        this.financialDoc = [];
        this.finalList = [];
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

            let _tempUniqList = _.uniqBy(ctl.documentList, 'category');
            _tempUniqList.forEach(element => {
                let _tempFilterList = [];
                let _tempArray = {};
                _tempFilterList = _.filter(ctl.documentList, { 'category': element.category });
                _tempArray = { 'category': element.category, list: _tempFilterList };
                ctl.finalList.push(_tempArray);
            });
            console.log('Final list : ', ctl.finalList);

            // ctl.NoticeOfMeeting = _.filter(ctl.documentList, function (o) { return o.category === 'Notice of Meeting'; });
            // ctl.proxyList = _.filter(ctl.documentList, function (o) { return o.category === 'Proxy'; });
            // ctl.financialDoc = _.filter(ctl.documentList, function (o) { return o.category === 'Financial Documents'; });
        });
    }
    onSearchByCategory(category) {
        this.finalList = [];
        if (category === '') {
            let _tempUniqList = _.uniqBy(this.documentList, 'category');
            _tempUniqList.forEach(element => {
                let _tempFilterList = [];
                let _tempArray = {};
                _tempFilterList = _.filter(this.documentList, { 'category': element.category });
                _tempArray = { 'category': element.category, list: _tempFilterList };
                this.finalList.push(_tempArray);
            });
        } else {
            let _tempFilterList = [];
            let _tempArray = {};
            _tempFilterList = _.filter(this.documentList, { 'category': category });
            _tempArray = { 'category': category, list: _tempFilterList };
            this.finalList.push(_tempArray);
        }
    }
}
