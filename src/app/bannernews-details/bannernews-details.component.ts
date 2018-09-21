import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SpService } from '../../shared/services/spcommon.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Config } from '../../shared/config/config';

@Component({
    selector: 'app-bannernews-details',
    templateUrl: './bannernews-details.component.html',
    styleUrls: ['./bannernews-details.component.css'],
    providers: [SpService]
})
export class BannernewsDetailsComponent implements OnInit {
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
            this.pdfUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(Config.getRootURL() + '/bannernews/SitePages/' + this.params);
        });
    }
    onBack() {
        this._router.navigate(['/user-list/Trasport-Pending']);
    }
}
