import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SpService, CommonService } from '../../shared';
import { Transport } from './transport.model';

@Component({
    selector: 'app-user-list',
    templateUrl: './transportNew.component.html',
    styleUrls: ['./transportNew.component.css'],
    providers: [SpService]
})
export class NewTransportComponent implements OnInit {
    data: Transport;
    constructor(private _spService: SpService, private _commonservice: CommonService,
        private _router: Router, private route: ActivatedRoute) {
        this.data = new Transport();
    }

    ngOnInit() {
        this.data = new Transport();
        this.data.FirstName = 'Test data';
    }

}
