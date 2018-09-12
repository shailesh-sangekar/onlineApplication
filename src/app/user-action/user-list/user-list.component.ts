import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RestOptions, SpService, CommonService, ReservedMarks } from '../../../shared';
import { ServiceRequest } from '../';

@Component({
  selector: 'app-user-list',
  templateUrl: 'user-list.component.html',
  styleUrls: ['user-list.component.css'],
  providers: [SpService]
})
export class UserlistComponent implements OnInit {

  params: Params;
  service: any = '';
  action: any = '';
  serviceUrl: string;
  serviceList: string;
  data: Array<ServiceRequest>;
  options: RestOptions;
  fields: string;
  filesForImport: any;
  csvMarks: Array<ReservedMarks> = new Array<ReservedMarks>();
  importLabel = 'Import';
  importLabelFlag = true;

  constructor(private _spService: SpService, private _commonservice: CommonService,
    private _router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.params = params['id'];
      this.service = this.params ? this.params.split('-')[0] : '';
      this.action = this.params ? this.params.split('-')[1] : '';
      this.serviceUrl = params['url'];
      this.serviceList = params['list'];
    });
    this._spService.setBaseUrl(this.serviceUrl);
    this.init();
    this.getAllFields(this.serviceList);
    this.getListData(this.serviceList, this.options);
  }
  private init() {
    this.options = new RestOptions();
    this.options.select = 'ID,SID,NIC,FirstName,FamilyName,Address,CountryOfResidence,MobileNumber,Status,Created,Modified,GenericId';
    this.options.orderby = 'ID desc';
    this.options.filter = 'Status eq \'' + this.action + '\'';
    this.data = Array<ServiceRequest>();
    // for (let i = 1; i <= 100; i++) {
    //   const tempData = new ServiceRequest();
    //   tempData.SID = 'MH8938-' + i;
    //   tempData.NIC = i + 'VVhite';
    //   tempData.GenericId = 'GID' + i + 'VVhite';
    //   tempData.FirstName = 'HND';
    //   tempData.FamilyName = 'HNDFamily';
    //   tempData.Address = '2016';
    //   tempData.CountryOfResidence = 'CNT2016';
    //   tempData.MobileNumber = '5612016';
    //   this.data.push(tempData);
    //   const tempData1 = new ServiceRequest();
    //   tempData1.SID = 'MH89381';
    //   tempData1.NIC = 'VVhite1';
    //   tempData1.GenericId = 'GID02' + i + 'VVhite';
    //   tempData1.FirstName = 'HND1';
    //   tempData1.FamilyName = 'HNDFamily1';
    //   tempData1.Address = '20161';
    //   tempData1.CountryOfResidence = 'CNT20161';
    //   tempData1.MobileNumber = '15612016';
    //   this.data.push(tempData1);
    // }
    // const tempData2 = new ServiceRequest();
    // tempData2.SID = 'MH3752';
    // tempData2.NIC = 'VVhite1';
    // tempData2.GenericId = 'GID' + i + 'VVhite';
    // tempData2.FirstName = 'HND1';
    // tempData2.FamilyName = 'HNDFamily1';
    // tempData2.Address = '20161';
    // tempData2.CountryOfResidence = 'CNT20161';
    // tempData2.MobileNumber = '15612016';
    // this.data.push(tempData2);
    console.log(this.data);
  }
  getListData(ListName: string, Options?: RestOptions) {
    const ctl = this;
    if (this.options != null) {
      this._spService.read(ListName, Options).then(function (response) {
        if (response.d.results !== null) {
          ctl.data = response.d.results;
        }
      }).catch(function (response) {
        console.log('Wrong communication Occured at getData');
        console.error(response);
      });
    } else {
      this._spService.read(ListName).then(function (response) {
        if (response.d.results !== null) {
          ctl.data = response.d.results;
        }
      }).catch(function (response) {
        console.log('Wrong communication Occured at getData');
        console.error(response);
      });
    }
  }

  onUpdateRequest(id: string) {
    this._router.navigate(['/user-action', id, this.serviceUrl, this.serviceList, this.service + '-' + this.action]);
  }


  export() {
    const _options = new RestOptions();
    _options.select = this.fields;
    _options.orderby = 'ID desc';
    _options.filter = 'Status eq \'' + this.action + '\'';
    this.getData(this.serviceList, _options);
  }
  getData(ListName: string, Options?: RestOptions) {
    const ctl = this;
    this._spService.read(ListName, Options).then(function (response) {
      if (response.d.results !== null) {
        const _data: Array<any> = response.d.results;
        const _headers: any = Object.getOwnPropertyNames(_data[0]);
        const _dataToExport = JSON.parse(JSON.stringify(_data));
        const _currentDate = new Date();
        const _fileName: string = ctl.service + ' ' + ctl.action + ' Requests On ' + _currentDate.toDateString();
        ctl._commonservice.exportCSVFile(_headers, _dataToExport, _fileName);
      }
    }).catch(function (response) {
      console.log('Wrong communication Occured at getData');
      console.error(response);
    });
  }
  getAllFields(ListName: string) {
    const ctl = this;
    this._spService.getAllCustomFields(ListName).then(function (response) {
      if (response.d.results !== null) {
        ctl.fields = response.d.results.map(x => x.InternalName).toString();
      }
    });
  }

  /**Add multiple data to sharepoint list using batch*/
  import(data: any) {
    console.log(data);
    if (this.filesForImport === undefined || this.filesForImport === null) { alert('Please select the file'); return false; }
    if (!confirm('Are you sure you want import data?')) { return false; }
    if (this.importLabelFlag) {
      this.importLabelFlag = false;
      this.convertToJson(this.filesForImport, this.jsonResult);
      this.importLabelFlag = true;
      this.filesForImport.value = '';
    }
  }
  jsonResult(jsData: any, svc: any) {
    let Marks: Array<ReservedMarks> = new Array<ReservedMarks>();
    Marks = jsData;
    console.log(Marks);
    Marks.forEach(_mark => {
      svc._spService.create('ReservedMark', _mark);
    });
    alert('Importing data is complete!');
    //  svc._spService.addBatchRequest('ReservedMark', Marks);
  }
  // Convert CSV data to Json object dynamically
  convertToJson(csv: any, callback): any {
    const fileReaded = csv.target.files[0];
    const _svc = this;
    const reader: FileReader = new FileReader();
    reader.readAsText(fileReaded);
    reader.onload = (event) => {
      const csvData: any = reader.result;
      const allTextLines = csvData.split(/\r|\n|\r/);
      const headers = allTextLines[0].split(',');
      const lines = [];
      for (let counter = 1; counter < allTextLines.length; counter++) {
        // split content based on comma
        const currentLine = allTextLines[counter].split(',');
        if (currentLine.length === headers.length) {
          const newLine = {};
          for (let innerCounter = 0; innerCounter < headers.length; innerCounter++) {
            newLine[this.cleanData(headers[innerCounter])] = this.cleanData(currentLine[innerCounter]);
          }
          // log each row to see output
          lines.push(newLine);
        }
      }
      // all rows in the csv file
      callback(lines, _svc);
    };
  }
  // Get clean values of field of property
  cleanData(value: any) {
    return value
      .replace(/^\s*|\s*$/g, '') // remove leading & trailing space
      .replace(/^"|"$/g, '') // remove " on the beginning and end
      .replace(/""/g, '"'); // replace "" with "
  }
  convertFile(csv: any) {
    this.filesForImport = csv;
  }
}
