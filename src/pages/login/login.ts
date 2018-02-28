import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  lform: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private fb: FormBuilder, public service: ServiceProvider, 
    private toastCtrl: ToastController, 
    public loadingCtrl: LoadingController) {
    this.lform = fb.group({
      'username': [null, Validators.required],
      'password': [null, Validators.required],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    sessionStorage.clear();
  }
  goReset() {
    this.navCtrl.push('ForgotPasswordPage');
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
  reg(){
    this.navCtrl.push('RegisterPage');
  }
  login(form) {
    sessionStorage.clear();
    let loading = this.loadingCtrl.create({
      content: 'Loading...'
    });
    loading.present();
    console.log(form.username, form.password)
    if (form.username != '' || form.password != '') {
      let userCredential = { 'username': form.username, 'password': form.password };

      this.service.login(userCredential).subscribe(res => {
        if (res.successful) {
          this.presentToast('Login Success')
          this.presentToast(res.status)
          // sessionStorage.setItem('username', res.username)
          sessionStorage.setItem('username', res.username)
          sessionStorage.setItem('name', res.name)
          sessionStorage.setItem('Id', res.Id);
          sessionStorage.setItem('typhodStatus', res.typhodStatus);
          sessionStorage.setItem('gender', res.gender);
          sessionStorage.setItem('age', res.age);
          sessionStorage.setItem('LoggedIn', '1');
          this.navCtrl.push('FirstViewPage');

        }
        else {
          this.presentToast(res.error)
        }
      loading.dismiss();
      }, error => {
        this.presentToast("Service temporarily not available")
      });
    } else {
      loading.dismiss();
      this.presentToast("Empty/Invalid username and password")
    }

  }

}
