import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SpService } from '../../shared/services/spcommon.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Config } from '../../shared/config/config';

declare var $: any;

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css'],
    providers: [SpService]
})
export class SearchComponent implements OnInit, AfterViewInit {
    pdfUrl: any;
    params: Params;

    constructor(private _spService: SpService,
        private _router: Router, private route: ActivatedRoute,
        private domSanitizer: DomSanitizer) {
        // this._spService.baseUrl = 'https://alphaportal.sharepoint.com/sites/ibl';
    }

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            this.params = params['id'];
            this.pdfUrl = this.domSanitizer.bypassSecurityTrustResourceUrl('https://alphaportal.sharepoint.com/' + this.params);

        });
    }
    ngAfterViewInit() {
        $('#iframe1').contents().find('#suiteBarTop').css('display', 'none');
    }
    onLoad() {
        $('#iframe1').contents().find('#suiteBarTop').css('display', 'none');
    }
    onBack() {
        this._router.navigate(['/user-list/Trasport-Pending']);
    }
}
