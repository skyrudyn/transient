import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  profile:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public service: ServiceProvider, 
    private toastCtrl: ToastController, 
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
  }
  save(){
    
  }
  ngOnInit(){
    if(!sessionStorage.getItem('Id')){
      this.navCtrl.push('LoginPage');
    }else{
    this.service.getApplicantById(sessionStorage.getItem('Id')).subscribe(data=>{
      this.profile = data;
    })
  }
  }
}
