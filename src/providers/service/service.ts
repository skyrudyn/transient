// import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
/*
  Generated class for the ServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiceProvider {
  apiUrl: any = "https://transientservitor.my/backend";
  headers = new Headers();
  constructor(public http: Http) {
    console.log('Hello ServiceProvider Provider');
  }

 
  public login(data) {
    let url = '{url}/loginWorker.php'
              .replace(/\{url\}/g, this.apiUrl)
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    let params = "username=" + data.username + "&password=" + data.password;
    return this.http.post(url, params, { headers: this.headers }).map((res: Response) => {
      return res.json();
    });

  }
  public getJobList() {
    let url = '{url}/getEvent.php'
              .replace(/\{url\}/g, this.apiUrl)
    return this.http.get(url).map((res: Response) => {
      return res.json();
    });
  }

 }
