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
    console.log('ionViewDidLoad AppliedJobPage');
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
        console.log(res,"applied")
        this.service.getJobList().subscribe(res => {
          this.job = res.response;
          console.log(res,"event")
          this.job.forEach(j => {
            this.appliedJob.forEach(sj => {
              if (sj.jobId == j.eventId) {
                j.status = sj.status;
                  this.appliedJobList.push(j);
              }
            })
          })
          loading.dismiss();
          console.log(this.appliedJobList)
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
      console.log("loggedIn")
      this.navCtrl.push('JobPage', { data: job });
    } else {
      this.navCtrl.push('LoginPage', { data: job });
    }
  }
}
