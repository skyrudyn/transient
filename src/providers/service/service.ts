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
  apiUrl: any = "http://transientservitor.my/backend";
  headers = new Headers();
  constructor(public http: Http) {
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
  public register(data) {
    let url = '{url}/registerWorker.php'
              .replace(/\{url\}/g, this.apiUrl)
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    let params = "uname="+data.uname + "&pass=" + data.password + "&name=" + data.name + 
                "&age=" + data.age + "&email=" +data.email +  "&address="+ data.address +"&icNo="+ data.ic 
                +"&phone="+ data.phone +"&typhodStatus="+ data.typhodStatus +"&gender=" +data.gender;
    return this.http.post(url, params, { headers: this.headers }).map((res: Response) => {
      return res.json();
    });

  }
  public applyJob(jobId,applicantId,gender,participantType,value,createdBy) {
    let url = '{url}/applyjob.php'
              .replace(/\{url\}/g, this.apiUrl)
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    let params = "jobId="+jobId + "&applicantId=" + applicantId + '&gender=' + gender +
                 '&participantType=' +participantType+ '&value='+value+ '&createdBy=' +createdBy;
    return this.http.post(url, params, { headers: this.headers }).map((res: Response) => {
      return res.json();
    });

  }
  public saveJob(jobId,applicantId) {
    let url = '{url}/marksavedJob.php'
              .replace(/\{url\}/g, this.apiUrl)
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    let params = "jobId="+jobId + "&applicantId=" + applicantId;
    return this.http.post(url, params, { headers: this.headers }).map((res: Response) => {
      return res.json();
    });

  }

  public rate(jobId,rating,applicantId) {
    let url = '{url}/rate.php?jobId={jobId}&rating={rating}&applicantId={applicantId}'
              .replace(/\{url\}/g, this.apiUrl)
              .replace(/\{jobId\}/g, jobId)
              .replace(/\{rating\}/g, rating)
              .replace(/\{applicantId\}/g, applicantId)
    // this.headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    // let params = "jobId="+jobId + "&rating=" + rating + "&applicantId=" +applicantId;
    return this.http.get(url).map((res: Response) => {
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
  public getSavedJob(applicantId) {
    let url = '{url}/getSavedJob.php?applicantId={applicantId}'
              .replace(/\{url\}/g, this.apiUrl)
              .replace(/\{applicantId\}/g,applicantId)
    return this.http.get(url).map((res: Response) => {
      return res.json();
    });
  }
  public getAppliedJob(applicantId) {
    let url = '{url}/getAppliedJob.php?applicantId={applicantId}'
              .replace(/\{url\}/g, this.apiUrl)
              .replace(/\{applicantId\}/g,applicantId)
    return this.http.get(url).map((res: Response) => {
      return res.json();
    });
  }
  public getRatedJob(applicantId) {
    let url = '{url}/getRate.php?applicantId={applicantId}'
              .replace(/\{url\}/g, this.apiUrl)
              .replace(/\{applicantId\}/g,applicantId)
    return this.http.get(url).map((res: Response) => {
      return res.json();
    });
  }
  public cancelJob(applicantId,jobId) {
    let url = '{url}/cancelJob.php?applicationId={applicationId}&jobId={jobId}'
              .replace(/\{url\}/g, this.apiUrl)
              .replace(/\{applicantId\}/g,applicantId)
              .replace(/\{jobId\}/g,jobId)

    return this.http.get(url).map((res: Response) => {
      return res.json();
    });
  }
  public getApplicantById(applicantId) {
    let url = '{url}/getApplicantById.php?applicantId={applicantId}'
      .replace(/\{url\}/g, this.apiUrl)
      .replace(/\{applicantId\}/g, applicantId)
    return this.http.get(url).map((res: Response) => {
      return res.json();
    });
  }
 }
