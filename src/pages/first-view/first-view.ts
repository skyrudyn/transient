import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { CalendarComponentOptions } from 'ion2-calendar'
import { ServiceProvider } from '../../providers/service/service';
import { DatePipe } from '@angular/common' ;
 /**
 * Generated class for the FirstViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-first-view',
  templateUrl: 'first-view.html',
})
export class FirstViewPage {
  date: string;
  type: 'object'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'
  filteredJob:any=[];
  alljob:any;
  alljobs:any=[];
  showFilter:boolean = false;
  showCalendar:boolean = false;
  showLocation:boolean = false;
  filterType:any;
  constructor(public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,public service:ServiceProvider) {
   
    
  }
  ngOnInit(){
    let loading = this.loadingCtrl.create({
      content: 'Loading...'
    });
  
    loading.present();
    this.service.getJobList().subscribe(res => {
      if(res.successful){
      this.alljob = res.response;
      this.alljob.forEach(r=>{
        this.alljobs.push(r);
      })
    }else{
      this.alljob = null;
      
    }
    loading.dismiss();
    });
    
  }
  onChange($event) {
    this.filteredJob = [];
    this.alljob.forEach(jobby=>{
      if(jobby.eventDate == $event.format("YYYY-MM-DD")){
        this.filteredJob.push(jobby)
      }
    })
  }
  showFilters(ev){
    if(ev.value){
      this.showFilter = true;
    }else{
      this.showFilter = false;
      this.showCalendar = false;
      this.showLocation = false;
      this.filterType = "";
    }
  }
  selectedFilter(f){
    if(f == 1){
      this.showCalendar = true;
      this.showLocation = false;
    }else{
      this.showCalendar = false;
      this.showLocation = true;
    }
  }
  login(){
    this.navCtrl.push('LoginPage');
  }

  applyCheck(job){
    if(sessionStorage.getItem('LoggedIn') == '1'){
      this.navCtrl.push('JobPage',{data:job});
    }else{
      this.navCtrl.push('LoginPage',{data:job});
    }
  }

}
