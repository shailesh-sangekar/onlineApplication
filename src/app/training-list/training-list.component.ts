import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpService } from '../../shared/services/spcommon.service';
import { Config } from '../../shared/config/config';
import { RestOptions } from '../../shared/models/restoptions';

@Component({
    selector: 'app-training-list',
    templateUrl: './training-list.component.html',
    styleUrls: ['./training-list.component.css'],
    providers: [SpService]
})
export class TrainingComponent implements OnInit {
    listName = 'TrainingList';
    trainingsList: Array<any>;
    AttachmentList: Array<any>;
    options: RestOptions;
    Attachment: any;
    constructor(private _spService: SpService, private _router: Router) {
        this._spService.baseUrl = Config.getRootURL();
    }

    ngOnInit() {
        this.trainingsList = new Array<any>();
        this.getJobOffers();
        this.options = new RestOptions();
    }
    onDetails() {
        this._router.navigate(['/user-list/Trasport-Pending']);
    }
    getJobOffers() {
        this.options = new RestOptions();
        this.options.select = 'ID,Title,ExpiryDate,Location,TrainingDescription,AttachmentFiles,AttachmentFiles/ServerRelativeUrl';
        this.options.expand = 'AttachmentFiles';
        const svc = this;
        this._spService.read(this.listName, this.options).then(function (response) {
            svc.trainingsList = response.d.results;
            console.log(svc.trainingsList);
        }).catch(function (response) { console.log(response); });
    }
    getAttachment(data: any) {
        const svc = this;
        this._spService.getAttach(this.listName, data.ID).then(function (response) {
            svc.AttachmentList = response.d.results;
            console.log(svc.AttachmentList);
        }).catch(function (response) { console.log(response); });
    }
}
