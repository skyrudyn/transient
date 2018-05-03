import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {
  allJob:any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public service:ServiceProvider,public toaster:ToastController) {
  }

  ionViewDidLoad() {
    this.service.getJobList().subscribe(res => {
      this.allJob = res;
    })
  }
  viewJob(data){
    this.navCtrl.push('JobPage',{data:data});
  }
}
