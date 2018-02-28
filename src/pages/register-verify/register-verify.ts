import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';

/**
 * Generated class for the RegisterVerifyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register-verify',
  templateUrl: 'register-verify.html',
})
export class RegisterVerifyPage {

  rform: FormGroup;
  resendCounter:any;
  resendCounterExceed:boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private fb: FormBuilder, public service: ServiceProvider,
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController) {
    this.rform = fb.group({
      'vcode': [null, Validators.required],
    });
  }

  ionViewDidLoad() {
    this.resendCounter = 0;
  }
  
  resend(){
    if(this.resendCounter < 3) {
    this.rform.get('vcode').patchValue(null);
    this.resendCounter++;
    }else{
      this.resendCounterExceed = true;
      this.presentToast('Maximum number of resend codes service used (3 Times)');
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

  verify(r){
    let loading = this.loadingCtrl.create({
      content: 'Loading...'
    });
    loading.present();
    if(r.vcode){
    loading.dismiss(); 
    this.presentToast("Sign Up Successful.Please login using registered credentials")
    this.navCtrl.push('LoginPage')
    }else if(!r.vcode){
      loading.dismiss();
      this.presentToast("Please fill in Verification Code")
    }else{    
    loading.dismiss();
    this.presentToast("Service temporarily not available")
    }
  }
}
