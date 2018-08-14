import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SpService, CommonService } from '../../../shared';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TransportService } from '../../../services/transport.service';
import { MembersService } from '../../../services/members.service';
import { User } from '../../../shared/models/User';
import { Member } from '../../../shared/models/Member';

@Component({
    selector: 'app-user-list',
    templateUrl: './searchmark.component.html',
    styleUrls: ['./searchmark.component.css'],
    providers: [SpService]
})
export class SearchMarkComponent implements OnInit {
    data: Transport;
    _from: any;
    _to: any;
    errorMessage: string;
    submitFail = false;
    OnBehalfValues = ['Yes', 'No'];
    onBehalfFlag = false;
    onApplicationTypeFlag = false;
    sitekey: string;
    _user: User;
    MemberDetails: Member;
    allowSubmit = false;
    __captacha: string;
    avalabilityLabel = 'Check Availability';
    validMark = false;
    isReadonly = false;
    regRules: any;

    SearchForm: FormGroup;
    charOption: string[];
    charOption2: string[];
    ruleBox1 = false;
    ruleBox2 = false;

    constructor(private _spService: SpService, private _commonservice: CommonService, private _transportService: TransportService,
        private _router: Router, private route: ActivatedRoute, private searchFormBuilder: FormBuilder,
        private _membersService: MembersService) {
        this.charOption = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
            'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        this.charOption = ['A', 'B', 'C', 'D', 'E', 'F'];
    }

    ngOnInit() {
        this.setSearchForm();
    }
    setSearchForm() {
        this.SearchForm = this.searchFormBuilder.group({
            Rule1: ['A'],
            Rule2: ['A'],
            RuleOption: [''],
            FromNumber: [1, [Validators.required]],
            ToNumber: [1, [Validators.required]],
        });
    }
    back() {
        this._router.navigate(['/dashboard']);
    }
    onSubmit({ value, valid }: { value: Transport, valid: boolean }) {
        if (valid) {
            if (!this.allowSubmit) {
                alert('Please select captcah!');
                return;
            }
            if (!this.validMark) {
                alert('Mark is not available, Please check availability for mark!');
                return;
            }
            this.submitFail = false;
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
    // onSelectOnBehalf(type) {
    //     if (type === 'No') {
    //         this.onBehalfFlag = false;
    //     } else {
    //         this.onBehalfFlag = true;
    //         this.setSearchForm();
    //     }
    // }
    // checkRegistrationMark(RegistrationMark: string) {
    //     const _cntx = this;
    //     this._transportService.ValidateRegistrationMark(RegistrationMark)
    //         .subscribe(
    //             (results: any) => {
    //                 _cntx.validMark = results;
    //                 if (_cntx.validMark) {
    //                     const _dt = new Date();
    //                     _cntx.search('Active', _dt.getFullYear().toString(), RegistrationMark);
    //                 }
    //             },
    //             error => {
    //                 this.errorMessage = <any>error;
    //                 console.log(this.errorMessage);
    //             });
    // }
    search(Prefix: string, From: string, To: string) {
        const _cntx = this;
        this._transportService.searchMarks(Prefix, From, To)
            .subscribe(
                (results: any) => {
                    console.log(results);
                },
                error => {
                    this.errorMessage = <any>error;
                    console.log(this.errorMessage);
                });
    }
    onOut(event: string) {
        const val = parseInt(event, 10);
        if (event.length > 4) {
            this.SearchForm.patchValue({ RegistrationMark: '9999' });
        }
        if (val <= 0) {
            this.SearchForm.patchValue({ RegistrationMark: '1' });
        }
    }
    onRadioChange(event: string) {
        this.SearchForm.get('RuleOption');
        console.log(this.SearchForm.get('RuleOption').value);
        console.log(event);
        switch (event) {
            case 'R1':
                this.charOption = [];
                this.charOption2 = [];
                this.ruleBox1 = false;
                this.ruleBox2 = false;
                break;
            case 'R2':
                this.charOption = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q',
                    'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
                this.charOption2 = [];
                this.ruleBox1 = true;
                this.ruleBox2 = false;
                break;
            case 'R3':
                this.charOption = ['A', 'B', 'C', 'D', 'E', 'F'];
                this.charOption2 = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'];
                this.ruleBox1 = true;
                this.ruleBox2 = true;
                break;
            default:
            /** */
                break;
        }
    }
}
