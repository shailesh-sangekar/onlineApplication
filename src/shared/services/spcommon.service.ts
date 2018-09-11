
import { Injectable } from '@angular/core';

// RxJS dependency
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SpService {

    // Data
    jsonHeader = 'application/json; odata=verbose';
    origin = '*';
    headers = new Headers({ 'Content-Type': this.jsonHeader, 'Accept': this.jsonHeader, 'Access-Control-Allow-Origin': this.origin });
    options = new RequestOptions({ headers: this.headers });
    baseUrl: String;
    apiUrl: String;
    currentUser: String;
    login: String;

    constructor(private http: Http) {
        this.setBaseUrl();
    }

    // HTTP Error handling
    private handleError(error: Response | any) {
        // Generic from https://angular.io/docs/ts/latest/guide/server-communication.html
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status || ''} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    // String ends with
    private endsWith(str: string, suffix: string) {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
    }

    // ----------SHAREPOINT GENERAL----------
    // Set base working URL path
    setBaseUrl(webUrl?: string) {
        if (webUrl) {
            // user provided target Web URL
            this.baseUrl = webUrl;
        } else {
            // default local SharePoint context
            const ctx = window['_spPageContextInfo'];
            if (ctx) {
                this.baseUrl = ctx.webAbsoluteUrl;
            }
        }

        // Default to local web URL
        // this.apiUrl = this.baseUrl + '/_api/web/lists/GetByTitle(\'{0}\')/items';
        this.apiUrl = this.baseUrl + '/_api/web/lists/GetByTitle(\'{0}\')/items';


        // Request digest
        const el = document.querySelector('#__REQUESTDIGEST');
        if (el) {
            // Digest local to ASPX page
            // this.headers.delete('X-RequestDigest');
            this.headers.append('X-RequestDigest', el.nodeValue);
        }
    }

    // Refresh digest token
    refreshDigest(): Promise<any> {
        const svc = this;
        return this.http.post(this.baseUrl + '/_api/contextinfo', null, this.options).toPromise().then(function (res: Response) {
            svc.headers.delete('X-RequestDigest');
            svc.headers.append('X-RequestDigest', res.json().d.GetContextWebInformation.FormDigestValue);
        });
    }

    // Send email
    sendMail(to: string, ffrom: string, subj: string, body: string): Promise<any> {
        // Append metadata
        const tos: string[] = to.split(',');
        const recip: string[] = (tos instanceof Array) ? tos : [tos];
        const message = {
            'properties': {
                '__metadata': {
                    'type': 'SP.Utilities.EmailProperties'
                },
                'To': {
                    'results': recip
                },
                'From': ffrom,
                'Subject': subj,
                'Body': body
            }
        };
        const url = this.baseUrl + '/_api/SP.Utilities.Utility.SendEmail';
        const data = JSON.stringify(message);
        return this.http.post(url, data, this.options).toPromise();
    }

    // ----------SHAREPOINT USER PROFILES----------
    // Lookup SharePoint current web user
    getCurrentUser(): Promise<any> {
        const url = this.baseUrl + '/_api/web/currentuser?$expand=Groups';
        return this.http.get(url, this.options).toPromise().then(function (res: Response) {
            return res.json();
        }).catch(this.handleError);
    }

    // Lookup my SharePoint profile
    getMyProfile(): Promise<any> {
        const url = this.baseUrl + '/_api/SP.UserProfiles.PeopleManager/GetMyProperties?select=*';
        return this.http.get(url, this.options).toPromise().then(function (res: Response) {
            return res.json();
        }).catch(this.handleError);
    }

    // Lookup any SharePoint profile
    getProfile(login: string): Promise<any> {
        const url = this.baseUrl + '/_api/SP.UserProfiles.PeopleManager/GetPropertiesFor(accountName=@v)?@v=\'' + login + '\'&select=*';
        return this.http.get(url, this.options).toPromise().then(function (res: Response) {
            return res.json();
        }).catch(this.handleError);
    }

    // Lookup any SharePoint UserInfo
    getUserInfo(id: string): Promise<any> {
        const url = this.baseUrl + '/_api/web/getUserById(' + id + ')';
        return this.http.get(url).toPromise().then(function (res: Response) {
            return res.json();
        }).catch(this.handleError);
    }

    // Ensure SPUser exists in target web
    ensureUser(login: string): Promise<any> {
        const url = this.baseUrl + '/_api/web/ensureuser';
        return this.http.post(url, login, this.options).toPromise().then(function (res: Response) {
            return res.json();
        }).catch(this.handleError);
    }

    // ----------SHAREPOINT LIST AND FIELDS----------
    // Create list
    createList(title: string, baseTemplate: string, description: string): Promise<any> {
        const data = {
            '__metadata': { 'type': 'SP.List' },
            'BaseTemplate': baseTemplate,
            'Description': description,
            'Title': title
        };
        const url = this.baseUrl + '/_api/web/lists';
        return this.http.post(url, data, this.options).toPromise().then(function (res: Response) {
            return res.json();
        }).catch(this.handleError);
    }

    // Create field
    createField(listTitle: string, fieldName: string, fieldType: string): Promise<any> {
        const data = {
            '__metadata': { 'type': 'SP.Field' },
            'Type': fieldType,
            'Title': fieldName
        };
        const url = this.baseUrl + '/_api/web/lists/GetByTitle(\'' + listTitle + '\')/fields';
        return this.http.post(url, data, this.options).toPromise().then(function (res: Response) {
            return res.json();
        }).catch(this.handleError);
    }

    // Get All fields
    getAllCustomFields(listTitle: string): Promise<any> {
        const url = this.baseUrl + '/_api/web/lists/getbytitle(\''
            + listTitle + '\')/fields?$filter=Hidden eq false and ReadOnlyField eq false';
        return this.http.get(url, this.options).toPromise().then(function (res: Response) {
            return res.json();
        }).catch(this.handleError);
    }

    // ----------SHAREPOINT FILES AND FOLDERS----------
    // Create folder
    createFolder(folderUrl: string): Promise<any> {
        const data = {
            '__metadata': {
                'type': 'SP.Folder'
            },
            'ServerRelativeUrl': folderUrl
        };
        const url = this.baseUrl + '/_api/web/folders';
        return this.http.post(url, data, this.options).toPromise().then(function (res: Response) {
            return res.json();
        }).catch(this.handleError);
    }

    // Upload file to folder
    // https://kushanlahiru.wordpress.com/2016/05/14/file-attach-to-sharepoint-2013-list-custom-using-angular-js-via-rest-api/
    // http://stackoverflow.com/questions/17063000/ng-model-for-input-type-file
    // var binary = new Uint8Array(FileReader.readAsArrayBuffer(file[0]));
    uploadFile(folderUrl: string, fileName: string, binary: any): Promise<any> {
        const url = this.baseUrl + '/_api/web/GetFolderByServerRelativeUrl(\''
            + folderUrl + '\')/files/add(overwrite=true, url=\'' + fileName + '\')';
        const svc = this;
        return this.refreshDigest().then(function (_res: Response) {
            return svc.http.post(url, binary, svc.options).toPromise().then(function (res: Response) {
                return res.json();
            }).catch(svc.handleError);
        });
    }

    // Upload attachment to item
    uploadAttach(listName: string, id: string, fileName: string, binary: any, overwrite?: boolean): Promise<any> {
        let url = this.baseUrl + '/_api/web/lists/GetByTitle(\'' + listName + '\')/items(' + id;
        const options = this.options;
        if (overwrite) {
            // Append HTTP header PUT for UPDATE scenario
            options.headers.append('X-HTTP-Method', 'PUT');
            url += ')/AttachmentFiles(\'' + fileName + '\')/$value';
        } else {
            // CREATE scenario
            url += ')/AttachmentFiles/add(FileName=\'' + fileName + '\')';
        }
        const svc = this;
        return this.refreshDigest().then(function (_res: Response) {
            return svc.http.post(url, binary, options).toPromise().then(function (res: Response) {
                return res.json();
            }).catch(svc.handleError);
        });
    }

    // Get attachment for item
    getAttach(listName: string, id: string): Promise<any> {
        const url = this.baseUrl + '/_api/web/lists/GetByTitle(\'' + listName + '\')/items(' + id + ')/AttachmentFiles';
        return this.http.get(url, this.options).toPromise().then(function (res: Response) {
            return res.json();
        }).catch(this.handleError);
    }

    // Copy file
    copyFile(sourceUrl: string, destinationUrl: string): Promise<any> {
        const url = this.baseUrl + '/_api/web/GetFileByServerRelativeUrl(\''
            + sourceUrl + '\')/copyto(strnewurl=\'' + destinationUrl + '\',boverwrite=false)';
        return this.http.post(url, this.options).toPromise().then(function (res: Response) {
            return res.json();
        }).catch(this.handleError);
    }

    // ----------SHAREPOINT LIST CORE----------
    // CREATE item - SharePoint list name, and JS object to stringify for save
    create(listName: string, jsonBody: any): Promise<any> {
        const url = this.apiUrl.replace('{0}', listName);
        // append metadata
        if (!jsonBody.__metadata) {
            jsonBody.__metadata = {
                'type': 'SP.ListItem'
            };
        }
        const data = JSON.stringify(jsonBody);
        const svc = this;
        return this.refreshDigest().then(function (_res: Response) {
            return svc.http.post(url, data, svc.options).toPromise().then(function (res: Response) {
                return res.json();
            }).catch(svc.handleError);
        });
    }

    // Build URL string with OData parameters
    readBuilder(url: string, options: any): string {
        if (options) {
            if (options.filter) {
                url += ((url.indexOf('?') === -1) ? '?' : '&') + '$filter=' + options.filter;
            }
            if (options.select) {
                url += ((url.indexOf('?') === -1) ? '?' : '&') + '$select=' + options.select;
            }
            if (options.orderby) {
                url += ((url.indexOf('?') === -1) ? '?' : '&') + '$orderby=' + options.orderby;
            }
            if (options.expand) {
                url += ((url.indexOf('?') === -1) ? '?' : '&') + '$expand=' + options.expand;
            }
            if (options.top) {
                url += ((url.indexOf('?') === -1) ? '?' : '&') + '$top=' + options.top;
            }
            if (options.skip) {
                url += ((url.indexOf('?') === -1) ? '?' : '&') + '$skip=' + options.skip;
            }
        }
        return url;
    }

    // READ entire list - needs $http factory and SharePoint list name
    read(listName: string, options?: any): Promise<any> {
        // Build URL syntax
        // https://msdn.microsoft.com/en-us/library/office/fp142385.aspx#bk_support
        let url = this.apiUrl.replace('{0}', listName);
        url = this.readBuilder(url, options);
        return this.http.get(url, this.options).toPromise().then(function (resp: Response) {
            return resp.json();
        });
    }

    // READ single item - SharePoint list name, and item ID number
    readItem(listName: string, id: string): Promise<any> {
        let url = this.apiUrl.replace('{0}', listName) + '(' + id + ')';
        url = this.readBuilder(url, null);
        return this.http.get(url, this.options).toPromise().then(function (resp: Response) {
            return resp.json();
        });
    }

    // UPDATE item - SharePoint list name, item ID number, and JS object to stringify for save
    update(listName: string, id: string, jsonBody: any): Promise<any> {
        // Append HTTP header MERGE for UPDATE scenario
        const localOptions: RequestOptions = this.options;
        localOptions.headers.append('X-HTTP-Method', 'MERGE');
        localOptions.headers.append('If-Match', '*');

        // Append metadata
        if (!jsonBody.__metadata) {
            jsonBody.__metadata = {
                'type': 'SP.ListItem'
            };
        }
        const data = JSON.stringify(jsonBody);
        const url = this.apiUrl.replace('{0}', listName) + '(' + id + ')';
        const svc = this;
        return this.refreshDigest().then(function (res: Response) {
            return svc.http.post(url, data, localOptions).toPromise().then(function (resp: Response) {
                return resp.json();
            });
        });
    }

    // DELETE item - SharePoint list name and item ID number
    del(listName: string, id: string): Promise<any> {
        // append HTTP header DELETE for DELETE scenario
        const localOptions: RequestOptions = this.options;
        localOptions.headers.append('X-HTTP-Method', 'DELETE');
        localOptions.headers.append('If-Match', '*');
        const url = this.apiUrl.replace('{0}', listName) + '(' + id + ')';
        return this.http.post(url, localOptions).toPromise().then(function (resp: Response) {
            return resp.json();
        });
    }

    // JSON blob read from SharePoint list - SharePoint list name
    jsonRead(listName: string): Promise<any> {
        const svc = this;
        return this.getCurrentUser().then(function (res: any) {
            // GET SharePoint Current User
            svc.currentUser = res.d;
            svc.login = res.d.LoginName.toLowerCase();
            if (svc.login.indexOf('\\')) {
                // Parse domain prefix
                svc.login = svc.login.split('\\')[1];
            }

            // GET SharePoint List Item
            const url = svc.apiUrl.replace('{0}', listName) + '?$select=JSON,Id,Title&$filter=Title+eq+\'' + svc.login + '\'';
            return svc.http.get(url, svc.options).toPromise().then(function (res2: Response) {

                // Parse JSON response
                const d2 = res2.json().d;
                if (d2.results.length) {
                    return d2.results[0];
                } else {
                    return null;
                }

            }).catch(svc.handleError);
        });
    }

    // JSON blob upsert write to SharePoint list - SharePoint list name and JS object to stringify for save
    jsonWrite(listName: string, jsonBody: any) {
        const svc = this;
        return this.refreshDigest().then(function (res: Response) {
            return svc.jsonRead(listName).then(function (item: any) {
                // HTTP 200 OK
                if (item) {
                    // update if found
                    item.JSON = JSON.stringify(jsonBody);
                    return svc.update(listName, item.Id, item);
                } else {
                    // create if missing
                    item = {
                        '__metadata': {
                            'type': 'SP.ListItem'
                        },
                        'Title': svc.login,
                        'JSON': JSON.stringify(jsonBody)
                    };
                    return svc.create(listName, item);
                }
            });
        });
    }
    // **//
    /**
    * Adds employees in a single batch request.
    * @param {Array{any}} batchData - JSON array of ListItem to add.
    */
    addBatchRequest(listName: string, batchData: Array<any>) {

        // generate a batch boundary
        const batchGuid = this.GenerateGUID();
        const changeSetId = this.GenerateGUID();

        // creating the body
        const batchContents = new Array();

        // for each object...
        batchData.forEach(bData => {
            // append metadata
            if (!bData.__metadata) {
                bData.__metadata = { 'type': 'SP.' + listName + 'ListItem' };
            }
            // create the request endpoint
            const listUrl = this.apiUrl.replace('{0}', listName);

            // create the changeset
            batchContents.push('--changeset_' + changeSetId);
            batchContents.push('Content-Type: application/http');
            batchContents.push('Content-Transfer-Encoding: binary');
            batchContents.push('');
            batchContents.push('POST ' + listUrl + ' HTTP/1.1');
            batchContents.push('Content-Type: application/json;odata=verbose');
            batchContents.push('');
            batchContents.push(JSON.stringify(bData));
            batchContents.push('');
        });

        // END changeset to create data
        batchContents.push('--changeset_' + changeSetId + '--');

        // generate the body of the batch
        const batchBody = batchContents.join('\r\n');

        // create the request endpoint
        const batchApi = this.baseUrl + '/_api/$batch';

        // create request
        const svc = this;
        return this.refreshDigest().then(function (_res: Response) {
            // batches need a specific header
            const _header = svc.headers;
            _header.append('Content-Type', 'multipart/mixed; boundary="batch_' + batchGuid + '"');
            // const _header = new Headers({
            //     'X-RequestDigest': _res,
            //     'Content-Type': 'multipart/mixed; boundary="batch_' + batchGuid + '"'
            // });
            svc.options = new RequestOptions({ headers: _header });
            return svc.http.post(batchApi, batchBody, svc.options).toPromise().then(function (res: Response) {
                return res.json();
            }).catch(svc.handleError);
        });
    }

    //  Generates a GUID-like string, used in OData HTTP batches.
    GenerateGUID() {
        let d = new Date().getTime();
        const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = (d + Math.random() * 16) % 16 || 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r && 0x7 || 0x8)).toString(16);
        });
        return uuid;
    }
}
