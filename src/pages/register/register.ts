import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  sform: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private fb: FormBuilder, public service: ServiceProvider,
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController) {
    this.sform = fb.group({
      'name': [null, Validators.required],
      'uname': [null, Validators.required],
      'email': [null, Validators.required],
      'phone': [null, Validators.required],
      'isterms': [null, Validators.required],
      'password': [null, Validators.required],
      'gender':[null,Validators.required],
      'typhodStatus':[null,Validators.required],
      'address':[null,Validators.required],
      'ic':[null,Validators.required],
      'age':[null,Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  goto(p) {
    console.log(p)
    this.navCtrl.push(p);
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
  toggled(e){
    if(e.checked){
      this.sform.get('typhodStatus').patchValue(true);
    }else{
      this.sform.get('typhodStatus').patchValue(false);
    }
  }
  signup(s) {
    console.log(s)
    let loading = this.loadingCtrl.create({
      content: 'Loading...'
    });
    loading.present();
    if(s.name && s.email && s.uname && s.phone && s.isterms && s.password && s.gender
       && s.typhodStatus && s.address && s.ic  && s.age){
        let tempTyphodStatusValue = 0
        if(s.typhodStatus){
          tempTyphodStatusValue = 1
        }else{
          tempTyphodStatusValue = 0
        }
        let sformData = { 'name' : s.name, 'email': s.email, 'uname': s.uname, 'phone': s.phone,
        'password': s.password, 'gender': s.gender, 'typhodStatus': tempTyphodStatusValue, 'address' :s.address, 'ic':s.ic,
        'age': s.age};
        this.service.register(sformData).subscribe(res => {
          if (res.successful) {
          loading.dismiss();
          this.presentToast(res.message);
          this.navCtrl.push('LoginPage')
          }else{
            loading.dismiss();
            this.presentToast(res.error);
          }
        });
      // this.navCtrl.push('RegisterVerifyPage');
    }else if(!s.name && !s.email && !s.uname  && !s.phone && !s.isterms && !s.password && !s.gender 
      && !s.typhodStatus && !s.address && !s.ic && s.age){
      loading.dismiss();
      this.presentToast("Fill in all fields")
    }else{    
    loading.dismiss();
    this.presentToast("Service temporarily not available")
    }
  }
}
