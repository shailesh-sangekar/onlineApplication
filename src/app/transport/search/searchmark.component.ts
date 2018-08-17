import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SpService, CommonService } from '../../../shared';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { TransportService } from '../../../services/transport.service';
import { MembersService } from '../../../services/members.service';
import { User } from '../../../shared/models/User';
import { Member } from '../../../shared/models/Member';

@Component({
    selector: 'app-search-mark',
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

    searchResult: Array<string>;
    InRange = false;
    InMaxRange = false;
    SearchForm: FormGroup;
    charOption: string[];
    charOption2: string[];
    ruleBox1 = false;
    ruleBox2 = false;

    rule1Min = '1';
    rule1Max = '9999';

    rule2Min = '1';
    rule2Max = '2500';

    rule3Min = '1';
    rule3Max = '2500';

    rule4Min = '1';
    rule4Max = '2500';

    constructor(private _spService: SpService, private _commonservice: CommonService, private _transportService: TransportService,
        private _router: Router, private route: ActivatedRoute, private searchFormBuilder: FormBuilder,
        private _membersService: MembersService) {
        this.charOption = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
            'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        this.charOption = ['A', 'B', 'C', 'D', 'E', 'F'];
        this.searchResult = new Array<string>();
    }

    ngOnInit() {
        this.setSearchForm();
    }
    setSearchForm() {
        this.SearchForm = this.searchFormBuilder.group({
            Rule1: ['A'],
            Rule2: ['A'],
            RuleOption: ['R1'],
            FromNumber: [1, [Validators.required]],
            ToNumber: [1, [Validators.required]],
        });
    }
    back() {
        this._router.navigate(['/dashboard']);
    }
    resetFiltter() {
        this.searchResult = new Array<string>();
    }
    onSubmit({ value, valid }: { value: any, valid: boolean }) {
        if (valid) {
            if (parseInt(value.FromNumber, 10) >= parseInt(value.ToNumber, 10)) {
                this.InRange = true;
                this.SearchForm.patchValue({ ToNumber: '' });
                return false;
            } else { this.InRange = false; }
            if (this.InMaxRange) {
                return false;
            }

            switch (value.RuleOption) {
                case 'R2':
                    const prefix2 = value.Rule1;
                    this.search(prefix2, value.FromNumber, value.ToNumber);
                    break;
                case 'R3':
                    const prefix3 = value.Rule1 + value.Rule2;
                    this.search(prefix3, value.FromNumber, value.ToNumber);
                    break;
                case 'R4':
                    const prefix4 = value.Rule1 + value.Rule2;
                    this.search(prefix4, value.FromNumber, value.ToNumber);
                    break;
                default:
                    const prefix0 = '';
                    this.search(prefix0, value.FromNumber, value.ToNumber);
                    break;
            }
            // if (value.RuleOption === 'R2') {
            //     const prefix = value.Rule1;
            //     this.search(prefix, value.FromNumber, value.ToNumber);
            // }
            // if (value.RuleOption === 'R3') {
            //     const prefix = value.Rule1 + value.Rule2;
            //     this.search(prefix, value.FromNumber, value.ToNumber);
            // }
            // if (value.RuleOption === 'R4') {
            //     const prefix = value.Rule1 + value.Rule2;
            //     this.search(prefix, value.FromNumber, value.ToNumber);
            // } else {
            //     const prefix = '';
            //     this.search(prefix, value.FromNumber, value.ToNumber);
            // }
            this.submitFail = false;
        } else {
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
    search(Prefix: string, From: string, To: string) {
        const _cntx = this;
        this._transportService.searchMarks(Prefix, From, To)
            .subscribe(
                (results: any) => {
                    if (results !== null) {
                        this.searchResult = new Array<string>();
                        this.searchResult = results;
                    } else {
                        this.searchResult.push('No Mark Available');
                    }
                },
                error => {
                    this.errorMessage = <any>error;
                    console.log(this.errorMessage);
                });
    }
    onOut(name: string, value: string) {
        const val = parseInt(value, 10);
        const jsonObj = [];
        const item = {};
        const maxValue = this.SearchForm.get('RuleOption').value === 'R1' ? this.rule1Max
            : this.SearchForm.get('RuleOption').value === 'R2' ? this.rule2Max : this.rule3Max;
        item[name] = maxValue;
        jsonObj.push(item);

        if (value.length > 4) {
            this.SearchForm.patchValue(jsonObj[0]);
        }
        if (val <= 0) {
            this.SearchForm.patchValue(jsonObj[0]);
        }
        if (val > parseInt(maxValue, 10)) {
            this.InMaxRange = true;
        } else { this.InMaxRange = false; }
    }
    onCheckFrom(name: string) {
        const _fromVal = parseInt(this.SearchForm.get('FromNumber').value, 10);
        const _toVal = parseInt(this.SearchForm.get('ToNumber').value, 10);
        if (_fromVal < _toVal) {
            this.InRange = false;
        } else {
            this.InRange = true;
        }
    }
    onCheckTo(name: string) {
        const _fromVal = parseInt(this.SearchForm.get('FromNumber').value, 10);
        const _toVal = parseInt(this.SearchForm.get('ToNumber').value, 10);
        if (_fromVal < _toVal) {
            this.InRange = false;
        } else {
            this.InRange = true;
        }
    }
    onRadioChange(event: string) {
        // this.SearchForm.get('RuleOption');
        // console.log(this.SearchForm.get('RuleOption').value);
        // console.log(event);
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
            case 'R4':
                this.charOption = ['F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
                this.charOption2 = ['N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
                this.ruleBox1 = true;
                this.ruleBox2 = true;
                break;
            default:
                this.charOption = [];
                this.charOption2 = [];
                this.ruleBox1 = false;
                this.ruleBox2 = false;
                break;
        }
    }
}
