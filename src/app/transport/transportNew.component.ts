import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SpService, CommonService } from '../../shared';
import { Config } from '../../shared/config/config';
import { Transport } from './transport.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TransportService } from '../../services/transport.service';
import { MembersService } from '../../services/members.service';
import { User } from '../../shared/models/User';
import { Member } from '../../shared/models/Member';

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
    ApplicantType = ['Individual Applicant', 'Registered Companies, Corporate Bodies'];
    OnBehalfValues = ['Yes', 'No'];
    onBehalfFlag = false;
    onApplicationTypeFlag = false;
    sitekey: string;
    _user: User;
    MemberDetails: Member;
    allowSubmit = false;
    __captacha: string;
    constructor(private _spService: SpService, private _commonservice: CommonService, private _transportService: TransportService,
        private _router: Router, private route: ActivatedRoute, private transportFormBuilder: FormBuilder,
        private _membersService: MembersService) {
        this.data = new Transport();
        this.sitekey = Config.GetCaptchaKey();
        // this._from = 'ABC';
        // this._to = 'FMG';
        // if (this.validate(this._from, this._to, 'BCA')) {
        //     console.log('Result is TRUE');
        // } else {
        //     console.log('Result is false');
        // }
        this.MemberDetails = new Member();
        this._user = new User();
    }

    ngOnInit() {
        this._user = JSON.parse(localStorage.getItem('user'));
        this.getMemberDetails(this._user.LoginName.split('\\')[1]);
        this.setTransportForm(this.MemberDetails);
    }
    validate(from: any, to: any, value: any) {
        if (value >= from && value <= to) {
            return true;
        } else { return false; }
    }

    showResponse(response) {
        // call to a backend to verify against recaptcha with private key
        if (response !== null) {
            this.allowSubmit = true;
        } else {
            this.allowSubmit = false;
        }
    }

    setTransportForm(_member: Member) {
        this.TransportForm = this.transportFormBuilder.group({
            ApplicatType: ['Individual Applicant'],
            OnBehalf: [this.onBehalfFlag ? 'Yes' : 'No'],
            FirstName: [_member.FirstName, [Validators.required]],
            MiddleName: [_member.MiddleName],
            FamilyName: [_member.LastName, [Validators.required]],
            CompanyName: [''],
            CompanyNumber: [''],
            Address: [_member.Address, [Validators.required]],
            State: [_member.State],
            City: [_member.City, [Validators.required]],
            Town: [''],
            NIC: [_member.NIC],
            ContryOfResidence: [_member.CountryOfResidence, [Validators.required]],
            PhoneNumber: [_member.PhoneNumber],
            MobileNumber: [_member.MobileNumber],
            RegistrationNumber: ['', [Validators.required]],
            NYP: ['', [Validators.required]],
            Captcha: ['']
        });
    }
    back() {
        this._router.navigate(['/dashboard']);
    }
    initRecaptcha() {
        console.log('from Reacaptcha initRecaptcha');
    }
    getMemberDetails(loginName: string) {
        const _cntx = this;
        this._membersService.getDetails(loginName)
            .subscribe(
                (results: any) => {
                    _cntx.MemberDetails = results;
                    this.setTransportForm(_cntx.MemberDetails);
                    // const _dt = new Date();
                    // let dateString = _cntx.MemberDetails.DateOfBirth;
                    // let DOBDate = new Date(dateString);
                    // const age = _dt.getFullYear() - DOBDate.getFullYear();

                    // if (age <= 21) {
                    //     alert('You are under age for registration !');
                    //     this._router.navigate(['/dashboard']);
                    // }
                },
                error => {
                    this.errorMessage = <any>error;
                    console.log(this.errorMessage);
                });
    }
    addTransport(DataToAdd: any) {
        console.log('from transport');
        this._transportService.addTransport(DataToAdd)
            .subscribe(
                (results: any) => {
                    console.log('Transport Data Saved');
                    console.log(results);
                    this._router.navigate(['/dashboard']);
                },
                error => {
                    this.errorMessage = <any>error;
                    // this._router.navigate(['/unauthorized', 1]);
                });
    }
    onSubmit({ value, valid }: { value: Transport, valid: boolean }) {
        if (valid) {
            if (!this.allowSubmit) {
                alert('Please select captcah!');
                return;
            }
            this.submitFail = false;
            this.addTransport(value);
        } else {
            // this.errorFlagForAdd = true;
            this.submitFail = true;
            console.log('Invalid / Error in form submission');
        }
    }
    onSelect(type) {
        if (type === 'Individual Applicant') {
            this.onApplicationTypeFlag = false;
        } else {
            this.onApplicationTypeFlag = true;
        }
    }
    onSelectOnBehalf(type) {
        if (type === 'No') {
            this.onBehalfFlag = false;
            this.getMemberDetails(this._user.LoginName.split('\\')[1]);
        } else {
            this.onBehalfFlag = true;
            this.setTransportForm(new Member());
        }
    }
}
