import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { EventdetailsPage } from '../eventdetails/eventdetails';
import { YettostartlistdetilsPage } from '../yettostartlistdetils/yettostartlistdetils';

/**
 * Generated class for the YettostartlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-yettostartlist',
  templateUrl: 'yettostartlist.html',
})
export class YettostartlistPage {
dataget:any;
token:any;
  constructor(public rest:RestProvider,public navCtrl: NavController, public navParams: NavParams) {
   this.dataget=this.navParams.get('data');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad YettostartlistPage');
  }
  public getObjectKey(index)
  {
    console.log(index)
      return Object.keys(index);
  }

  eventdetails(EqpPlanId, Event_ID, Event_Status_ID)
{
  console.log(EqpPlanId)
  console.log(Event_ID)
  console.log(Event_Status_ID)

  this.token=JSON.parse(localStorage.getItem('menu'));
  var formData = new FormData();
  formData.append("eqp_plan_id",EqpPlanId);
  formData.append("event_id",Event_ID);
  formData.append("event_status",Event_Status_ID);
  formData.append('token', this.token);

   this.rest.eventDeatils(formData).then(data=>{
     console.log(data['data'].event_notification_details)
     this.navCtrl.push(YettostartlistdetilsPage,{"event_notification_details":data['data'].event_notification_details,"page":"Event Details"})
   })


  // this.navCtrl.push(EventdetailsPage)
  }

}
