import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController,LoadingController } from 'ionic-angular';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServiceProvider } from '../../providers/service/service';
/**
 * Generated class for the SavedJobPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-saved-job',
  templateUrl: 'saved-job.html',
})
export class SavedJobPage {
  savedJob:any;
  job:any;
  savedJobList:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private fb: FormBuilder, public service: ServiceProvider,
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController) {

    }

  ionViewDidLoad() {
  }
  ngOnInit(){
    let loading = this.loadingCtrl.create({
      content: 'Loading...'
    });
  
    loading.present();
    if(sessionStorage.getItem('Id')){
    let applicantId = sessionStorage.getItem('Id');
    this.service.getSavedJob(applicantId).subscribe(res => {
      this.savedJob = res.response;
      this.service.getJobList().subscribe(res => {
        this.job = res.response;  
        this.job.forEach(j=>{
          this.savedJob.forEach(sj=>{
            if(sj.jobId == j.eventId){
              j.status = sj.status;
              this.savedJobList.push(j);
            } 
          })
        })
        loading.dismiss();
      });
    });
  }else{
    loading.dismiss();
    this.presentToast('Session had ended.Please re-login')
    this.navCtrl.push('LoginPage');
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
  applyCheck(job){
    if(sessionStorage.getItem('LoggedIn') == '1'){
      console.log("loggedIn")
      this.navCtrl.push('JobPage',{data:job});
    }else{
      this.navCtrl.push('LoginPage',{data:job});
    }
  }
}
