import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SpService } from '../../shared/services/spcommon.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Config } from '../../shared/config/config';
import { RestOptions } from '../../shared/models/restoptions';
import * as _ from 'lodash/index';

@Component({
    selector: 'app-news-list',
    templateUrl: './news-list.component.html',
    styleUrls: ['./news-list.component.css'],
    providers: [SpService]
})
export class NewsListComponent implements OnInit {
    pdfUrl: any;
    params: Params;
    url: any = '';
    selectedYear: any = '2018';
    options: RestOptions;
    newsList: any;
    newsFinalList: any;
    totalPages: any;
    currentPage: any = 1;
    startRecord: any = 0;
    endRecord: any = 12;
    totalNumberToCalculate: any = 12;
    constructor(private _spService: SpService,
        private _router: Router, private route: ActivatedRoute,
        private domSanitizer: DomSanitizer) {
        this.url = Config.getRootURL();
        this.newsList = [];
        this.newsFinalList = [];
        // this._spService.baseUrl = 'https://alphaportal.sharepoint.com/sites/ibl';
    }

    ngOnInit() {
        this.getNewsList(this.selectedYear);
    }
    onPrevious(currentPage) {
        if (this.currentPage !== 1) {
            this.startRecord = this.startRecord - this.totalNumberToCalculate;
            this.endRecord = this.endRecord - this.totalNumberToCalculate;
            this.currentPage = currentPage - 1;
            this.newsList = [];
            this.newsList = _.slice(this.newsFinalList, this.startRecord, this.endRecord);
        }
    }
    onNext(currentPage) {
        if (this.currentPage !== this.totalPages) {
            this.startRecord = this.startRecord + this.totalNumberToCalculate;
            this.endRecord = this.endRecord + this.totalNumberToCalculate;
            this.currentPage = currentPage + 1;
            this.newsList = [];
            this.newsList = _.slice(this.newsFinalList, this.startRecord, this.endRecord);
        }
    }
    onSelect(year) {
        this.getNewsList(year);
    }
    getNewsList(year) {
        const ctl = this;
        ctl.newsList = [];
        ctl.newsFinalList = [];
        let startYear = Number(year) - 1;
        let endYear = Number(year) + 1;
        let startDate = new Date(startYear.toString()).toISOString();
        let endDate = new Date(endYear.toString()).toISOString();
        this.options = new RestOptions();
        this.options.filter = "(Modified ge datetime" + "'" + startDate + "'" + ") and(Modified le datetime" + "'" + endDate + "'" + ")";
        this.options.orderby = 'Modified desc';
        this.options.skip = '0';
        this.options.expand = 'CreatedBy,FirstPublishedRelativeTime,OriginalSourceItemId,OriginalSourceUrl,Path';
        this._spService.readNewsList('Site Pages', this.options).then(function (response) {
            ctl.newsFinalList = response.d.results;
            ctl.newsList = _.slice(ctl.newsFinalList, ctl.startRecord, ctl.endRecord);
            ctl.totalPages = Number(Math.ceil(ctl.newsFinalList.length / ctl.totalNumberToCalculate));
            console.log('News List', ctl.newsFinalList);
            // for (let i = 0; i < ctl.mainNews.length; i++) {
            //   ctl.getNewsImages(ctl.mainNews[i].LinkFilename.split('.')[0], i);
            // }
        });
    }
    onNewsClick(news: any) {
        this._router.navigate(['/news-details', news.FileName]);
    }
    onBack() {
        this._router.navigate(['/user-list/Trasport-Pending']);
    }
}
