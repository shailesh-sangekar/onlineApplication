import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthInfo } from '../../shared/models/authInfo';
import { AuthTokenService } from '../../shared/services/authToken.service';
import { CommonService } from '../../shared/services/common.service';
import { SpService } from '../../shared/services/spcommon.service';
import { TransportService } from '../../services/transport.service';
import { Router } from '@angular/router';
import { RestOptions } from '../../shared/models/restoptions';
import { Config } from '../../shared/config/config';
// import * as AOS from 'aos';


declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [SpService]
})
export class DashboardComponent implements OnInit, AfterViewInit {

  model: AuthInfo;
  loggedInUser: string;
  loginName: string;
  errorMessage: string;
  loggedInUserData: any;

  lat: any = -20.168529;
  lng: any = 57.485452;
  lat1: any = -20.024509;
  lng1: any = 57.576280;
  lat2: any = -20.327520;
  lng2: any = 57.383162;
  lat3: any = -20.258659;
  lng3: any = 57.490749;

  title = 'app';
  displayError = true;
  options: RestOptions;
  documentList: any;
  outsideNews: any;
  mainNews: any;
  bannerNews: any;
  url: any = '';
  announcementList: any;
  constructor(private _commonService: CommonService, private _authTokenService: AuthTokenService,
    private _transportService: TransportService, private _spService: SpService,
    private _router: Router) {
    this.model = new AuthInfo('password', '', '');
    // this._spService.baseUrl = 'https://alphaportal.sharepoint.com/sites/ibl';
    this.documentList = [];
    this.outsideNews = [];
    this.mainNews = [];
    this.bannerNews = [];
    this.announcementList = [];
    this.url = Config.getRootURL();
  }

  submitTransportData() {
    this.displayError = false;
    console.log('submit function' + this.displayError);


  }

  ngOnInit() {
    // AOS.init();
    this.loggedInUser = 'Ankit.panchal';
    this.loginName = 'Ankit.panchal';
    this.options = new RestOptions();
    this.options.top = '4';
    this.getDocuments();
    this.getOutsideNews();
    this.getMainNews();
    this.getBannerNews();
    this.getAnnouncement();
    // this.getBirthDate();
    // this.getAuthToken();
    // this._spService.read('ServiceConfig').then(function (response) {
    //   console.log(response.d.results);
    // });
  }
  ngAfterViewInit() {
    $('.block-news').slick({
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 939,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            dots: true,
          }
        },
        {
          breakpoint: 719,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
          }
        }
      ]
    });
  }
  getAuthToken() {

    this.model.UserName = this.loginName;
    this.model.Password = 'Espl@123';
    this._commonService.getAuthToken(this.model)
      .subscribe(
      (results: any) => {

        console.log('Access grated for current user');
        console.log(results);
      },
      error => {

        this.errorMessage = <any>error;
        // this._router.navigate(['/unauthorized', 1]);
      });
  }
  getAnnouncement() {
    console.log('from transport');
    const ctl = this;
    this._spService.read('IBLAnnouncement').then(function (response) {
      console.log(response.d.results);
      ctl.announcementList = response.d.results;
      for (let i = 0; i < ctl.announcementList.length; i++) {
        if (i === 0) {
          ctl.announcementList[i].class = 'active';
        } else {
          ctl.announcementList[i].class = '';
        }
      }
      console.log('Announcement', ctl.announcementList);
    });
  }
  getDocuments() {
    console.log('from transport');
    const ctl = this;
    this._spService.readDocument('Shared%20Documents', this.options).then(function (response) {
      console.log('Documents', response.d.results);
      ctl.documentList = response.d.results;
    });
  }
  getOutsideNews() {
    // const ctl = this;
    // this.options.top = '3';
    // this._spService.readOutsideNews('outsideNewsSideLibrary', this.options).then(function (response) {
    //   console.log(response.d.results);
    //   ctl.outsideNews = response.d.results;
    //   console.log('Outside News', ctl.outsideNews);
    // });
    const ctl = this;
    this.options = new RestOptions();
    this.options.filter = "ContentType eq 'Site Page'&promotedstate=2&published=true";
    this.options.select = 'LinkFilename,*';
    this.options.top = '3';
    this.options.orderby = 'Modified desc';
    this._spService.readOutsideNews('Site Pages', this.options).then(function (response) {
      ctl.outsideNews = response.value;
      console.log('Outside News', ctl.outsideNews);
      // for (let i = 0; i < ctl.mainNews.length; i++) {
      //   ctl.getNewsImages(ctl.mainNews[i].LinkFilename.split('.')[0], i);
      // }
    });
  }
  getMainNews() {
    const ctl = this;
    this.options = new RestOptions();
    this.options.filter = "ContentType eq 'Site Page'&promotedstate=2&published=true";
    this.options.select = 'LinkFilename,*';
    this.options.top = '3';
    this.options.orderby = 'Modified desc';
    this._spService.readNews('Site Pages', this.options).then(function (response) {
      ctl.mainNews = response.value;
      console.log('Main News', ctl.mainNews);
      // for (let i = 0; i < ctl.mainNews.length; i++) {
      //   ctl.getNewsImages(ctl.mainNews[i].LinkFilename.split('.')[0], i);
      // }
    });
  }
  getBannerNews() {
    const ctl = this;
    this.options = new RestOptions();
    this.options.filter = "ContentType eq 'Site Page'&promotedstate=2&published=true";
    this.options.select = 'LinkFilename,*';
    this.options.top = '1';
    this.options.orderby = 'Modified desc';
    this._spService.readBannerNews('Site Pages', this.options).then(function (response) {
      if (response.value.length > 0) {
        ctl.bannerNews = response.value[0];
        ctl.bannerNews.BannerImageUrl = ctl.bannerNews.BannerImageUrl + '&$&resolution=3';
        console.log('Banner News', ctl.bannerNews);
        // for (let i = 0; i < ctl.mainNews.length; i++) {
        //   ctl.getNewsImages(ctl.mainNews[i].LinkFilename.split('.')[0], i);
        // }
      }
    });
  }
  getNewsImages(url, i) {
    const ctl = this;
    this.options = new RestOptions();
    this.options.select = '*';
    this.options.expand = 'Files';
    this._spService.readNewsImages('SiteAssets/SitePages/' + url, this.options).then(function (response) {
      console.log('news images', response.d.results);
      ctl.mainNews[i].imgURL = response ? response.d.Files.results[0].ServerRelativeUrl : '';
      // ctl.documentList = response.d.results;
    }).catch(function (err) {
      ctl.mainNews[i].imgURL = 'https://ibltogether.sharepoint.com/SiteAssets/HomeAssets/assets/img/news-default.png';
    }
      );
  }
  getBirthDate() {
    const ctl = this;
    this._spService.readBirthDate('user information list').then(function (response) {
      console.log('user information list', response.d.results);
    });
  }
  onService(service: any, action: any, e: any) {
    e.preventDefault();
    this._router.navigate(['/user-list', service + '-' + action]);
  }
  onNewsClick(news: any) {
    this._router.navigate(['/news-details', news.FileName]);
  }
  onOutsideNewsClick(news: any) {
    this._router.navigate(['/outsidenews-details', news.FileName]);
  }
  onSpecialOffer() {
    this._router.navigate(['/special-offer']);
  }
  onViewMoreDoc() {
    this._router.navigate(['/document-list']);
  }
  onJobOfferClick() {
    this._router.navigate(['/job-offer']);
  }
  onTrainingClick() {
    this._router.navigate(['/training-list']);
  }
  onBannerNewsDetails(news: any) {
    this._router.navigate(['/bannernews-details', news.FileName]);
  }
}
