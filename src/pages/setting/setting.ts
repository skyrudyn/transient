import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { ServiceProvider } from '../../providers/service/service';

/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

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
  loadingJob() {
    let loading = this.loadingCtrl.create({
      content: 'Loading...'
    });

    loading.present();
    if (sessionStorage.getItem('Id')) {
      let applicantId = sessionStorage.getItem('Id');
      this.service.getRatedJob(applicantId).subscribe(res => {
        if (res.successful) {
          this.appliedJob = res.response;
          this.service.getJobList().subscribe(res => {
            this.job = res.response;
            if (this.job) {
              this.job.forEach(j => {
                if (this.appliedJob) {
                  this.appliedJob.forEach(sj => {
                    if (sj.jobId == j.eventId) {
                      j.status = sj.status;
                      j.rating = sj.rating;
                      j.ratingId = sj.Id;
                      j.applicantId = sj.applicantId;
                      this.appliedJobList.push(j);
                    }
                  })
                } else {
                  this.presentToast(res.error);
                }
              })
            } else {
              this.presentToast(res.error);
            }
            loading.dismiss();
          });
        } else {
          loading.dismiss();
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

  onModelChange(ev,val,applicantId){
    let loading = this.loadingCtrl.create({
      content: 'Loading...'
    });

    loading.present();
    this.service.rate(ev,val,applicantId).subscribe(data=>{
     if(data.successful){
       loading.dismiss();
       this.presentToast(data.message);
     }else{
       loading.dismiss();
       this.presentToast(data.error);
     } 
    })
  }
}
