import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController,LoadingController } from 'ionic-angular';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServiceProvider } from '../../providers/service/service';

/**
 * Generated class for the JobPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-job',
  templateUrl: 'job.html',
})
export class JobPage {
  data:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private fb: FormBuilder, public service: ServiceProvider,
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController) {
    this.data = this.navParams.get('data');
    console.log(this.data)
  }
  ngOnInit(){
    // if(sessionStorage.getItem('LoggedIn') == '1'){

    // }else{
    //   this.presentToast("Session Expired");
    //   this.navCtrl.push('LoginPage');
    // }
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
  apply(data){
    let loading = this.loadingCtrl.create({
    content: 'Loading...'
  });
  loading.present();
  let gender = sessionStorage.getItem('gender');
  let value =0;
    if(data.eventId != null && data.eventId){
      if(sessionStorage.getItem('Id')){
        if(data.participantType == 1){
          value = data.male - 1
        }else if(data.participantType == 2){
          value = data.female - 1
        }else if(data.participantType == 3 && gender == '1'){
          value = data.male - 1
        }else if(data.participantType == 3 && gender == '2'){
          value = data.female - 1
        }else if(data.participantType == 4){
          value = data.mixed - 1
        }
        console.log(value)
      let applicantId = sessionStorage.getItem('Id');
      this.service.applyJob(data.eventId,applicantId,gender,data.participantType,value).subscribe(res=>{
        if(res.successful){
          loading.dismiss()
          this.presentToast(res.message);
          this.navCtrl.pop()
        }else{
          loading.dismiss()
          this.presentToast(res.error);
          this.navCtrl.pop()
        }
      })
    }else{
      loading.dismiss()
      this.presentToast('Your session had expired. Please re-login')
      this.navCtrl.push('LoginPage')
    }
    }
  }
  save(data){
    let loading = this.loadingCtrl.create({
      content: 'Loading...'
    });
    loading.present();
    if(data.eventId != null && data.eventId && sessionStorage.getItem('Id') && sessionStorage.getItem('Id')!=null){
      let applicantId = sessionStorage.getItem('Id');
      this.service.saveJob(data.eventId,applicantId).subscribe(res=>{
        if(res.successful){
          loading.dismiss()
          this.presentToast(res.message);
          this.navCtrl.pop()
        }else{
          loading.dismiss()
          this.presentToast(res.error);
          this.navCtrl.pop()
        }
      })
    }
  }
}
