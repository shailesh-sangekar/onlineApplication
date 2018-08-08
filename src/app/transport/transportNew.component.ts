import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SpService, CommonService } from '../../shared';
import { Transport } from './transport.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TransportService } from '../../services/transport.service';

@Component({
    selector: 'app-user-list',
    templateUrl: './transportNew.component.html',
    styleUrls: ['./transportNew.component.css'],
    providers: [SpService]
})
export class NewTransportComponent implements OnInit {
    data: Transport;
    _from: any;
    _to: any;
    errorMessage: string;
    submitFail = false;
    TransportForm: FormGroup;

    constructor(private _spService: SpService, private _commonservice: CommonService, private _transportService: TransportService,
        private _router: Router, private route: ActivatedRoute, private transportFormBuilder: FormBuilder, ) {
        this.data = new Transport();
        // this._from = 'ABC';
        // this._to = 'FMG';
        // if (this.validate(this._from, this._to, 'BCA')) {
        //     console.log('Result is TRUE');
        // } else {
        //     console.log('Result is false');
        // }
    }

    ngOnInit() {
        this.data = new Transport();
        this.data.FirstName = 'Test data';
        this.setTransportForm();
    }
    validate(from: any, to: any, value: any) {
        if (value >= from && value <= to) {
            return true;
        } else { return false; }
    }

    showResponse(response) {
        // call to a backend to verify against recaptcha with private key
        console.log('Testing Captcha response');
        console.log(response);
    }

    setTransportForm() {
        this.TransportForm = this.transportFormBuilder.group({
            ApplicatType: ['Individual Applicant'],
            OnBehalf: [''],
            FirstName: ['TestName', [Validators.required]],
            MiddleName: ['', [Validators.required]],
            FamilyName: ['', [Validators.required]],
            CompanyName: ['', [Validators.required]],
            CompanyNumber: ['', [Validators.required]],
            Address: [''],
            State: [false],
            Town: [false],
            City: ['', [Validators.required]],
            ContryOfResidence: [''],
            PhoneNumber: [''],
            MobileNumber: [''],
            RegistrationNumber: [''],
            NYP: [''],
            Captcha: ['']
        });
    }
    back() {
        this._router.navigate(['/dashboard']);
    }
    initRecaptcha() {
        console.log('from Reacaptcha initRecaptcha');
    }

    addTransport(DataToAdd: any) {
        console.log('from transport');
        this._transportService.addTransport(DataToAdd)
            .subscribe(
                (results: any) => {
                    console.log('Transport Data Saved');
                    console.log(results);
                },
                error => {
                    this.errorMessage = <any>error;
                    // this._router.navigate(['/unauthorized', 1]);
                });
    }
    onSubmit({ value, valid }: { value: Transport, valid: boolean }) {
        if (!valid) {
            this.submitFail = false;
            this.addTransport(value);
        } else {
            // this.errorFlagForAdd = true;
            this.submitFail = true;
            console.log('Invalid / Error in form submission');
        }
    }
}
