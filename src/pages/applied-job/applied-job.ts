import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServiceProvider } from '../../providers/service/service';
/**
 * Generated class for the AppliedJobPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-applied-job',
  templateUrl: 'applied-job.html',
})
export class AppliedJobPage {

  appliedJob: any;
  job: any;
  appliedJobList: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private fb: FormBuilder, public service: ServiceProvider,
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController) {

  }

  ionViewDidLoad() {
  }
  ngOnInit() {
    this.loadingJob();
  }
  loadingJob(){
    let loading = this.loadingCtrl.create({
      content: 'Loading...'
    });

    loading.present();
    if (sessionStorage.getItem('Id')) {
      let applicantId = sessionStorage.getItem('Id');
      this.service.getAppliedJob(applicantId).subscribe(res => {
        this.appliedJob = res.response;
        this.service.getJobList().subscribe(res => {
          this.job = res.response;
          if(this.job){
          this.job.forEach(j => {
            if(this.appliedJob){
            this.appliedJob.forEach(sj => {
              if (sj.jobId == j.eventId) {
                j.status = sj.status;
                  this.appliedJobList.push(j);
              }
            })
          }else{
            this.presentToast(res.error);
          }
          })
        }else{
          this.presentToast(res.error);
        }
          loading.dismiss();
        });
      });
    } else {
      loading.dismiss();
      this.presentToast('Session had ended.Please re-login')
      this.navCtrl.push('LoginPage')
    }
  }
  cancel(j){
    let loading = this.loadingCtrl.create({
      content: 'Loading...'
    });

    loading.present();
    if (sessionStorage.getItem('Id')) {
      let applicantId = sessionStorage.getItem('Id');
      this.service.cancelJob(applicantId,j.eventId).subscribe(res => {
        if(res.successful){
          loading.dismiss();
          this.appliedJobList = [];
          this.loadingJob();
          this.presentToast(res.message)
        }else{
          loading.dismiss()
          this.presentToast(res.error)
        }
      });
    } else {
      loading.dismiss();
      this.presentToast('Session had ended.Please re-login')
      this.navCtrl.push('LoginPage')
    }
  }
  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
  applyCheck(job) {
    if (sessionStorage.getItem('LoggedIn') == '1') {
      this.navCtrl.push('JobPage', { data: job });
    } else {
      this.navCtrl.push('LoginPage', { data: job });
    }
  }
}
