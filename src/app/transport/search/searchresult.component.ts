import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SpService, CommonService } from '../../../shared';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { TransportService } from '../../../services/transport.service';
import { MembersService } from '../../../services/members.service';
import { User } from '../../../shared/models/User';
import { Member } from '../../../shared/models/Member';

@Component({
    selector: 'app-search-result',
    templateUrl: './searchresult.component.html',
    providers: [SpService]
})
export class SearchResultComponent implements OnInit, OnChanges {
    @Input() data: any;
    marksList: Array<MarkResult>;
    cars: any;
    constructor(private _router: Router) {
        this.marksList = new Array<MarkResult>();
    }

    ngOnChanges(changes: SimpleChanges) {
        const dtarray = changes.data.currentValue;
        this.bindData(dtarray);
    }
    ngOnInit() {
        if (this.marksList.length <= 0) {
            this.bindData(this.data);
        }
    }
    applyMark(_event: any) {
        console.log(_event);
        this._router.navigate(['/new-request', _event]);
    }
    bindData(dataArray: any) {
        this.marksList = new Array<MarkResult>();
        dataArray.forEach(item => {
            const res = new MarkResult();
            res.Id = '1';
            res.Mark = item;
            this.marksList.push(res);
        });
    }
}

export class MarkResult {
    public Mark: string;
    public Id: string;
}
