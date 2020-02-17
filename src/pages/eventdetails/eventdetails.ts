import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the EventdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-eventdetails',
  templateUrl: 'eventdetails.html',
})
export class EventdetailsPage {
  pageget:any;
  notification_details;
  pagecheck:any;
  status:any;
  desc:any;
  constructor(public rest:RestProvider,public navCtrl: NavController, public navParams: NavParams) 
  {
    this.pageget=this.navParams.get('page');

    
      if(this.pageget){
        this.pagecheck=this.pageget.replace(/\s/g, "");
         if(this.pagecheck=="MajorComponentDetails"){
          this.notification_details=this.navParams.get('event_notification_details') ;
         }
         else{
          this.notification_details=this.navParams.get('event_notification_details').event_notification_details;
         }
      }
    
   console.log(this.notification_details)
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventdetailsPage');
  }
  statusCheck(){
    console.log(this.status)

  }
  submitStatus(){
    var formData=new FormData();
    formData.append('','')
    this.rest.updateStatus(formData).then(data=>{


    })
  }
}
