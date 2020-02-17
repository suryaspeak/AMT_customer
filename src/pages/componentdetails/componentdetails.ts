import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventdetailsPage } from '../eventdetails/eventdetails';
import { RestProvider } from '../../providers/rest/rest';
import { ComponentalldetilsPage } from '../componentalldetils/componentalldetils';

/**
 * Generated class for the ComponentdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-componentdetails',
  templateUrl: 'componentdetails.html',
})
export class ComponentdetailsPage {
table:any;
flag:any;
token:any;
  constructor(public rest:RestProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.table=this.navParams.get('selecttable')
    this.flag=this.navParams.get('flag');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ComponentdetailsPage');
  }
  public getObjectKey(index)
  {

    return Object.keys(index);
  }
  
eventdetails(item)
{

  console.log(item.Event_ID)
  
  this.token=JSON.parse(localStorage.getItem('menu'));
  var formData = new FormData();
  formData.append("eqp_plan_id",item.EqpPlanId);
  formData.append("event_status",item.Event_Status_ID);
  formData.append("event_id",item.Event_ID)
  formData.append("comp_code_id",item.ComponentCodeID );
  // eqp_plan_id, event_status, event_id, comp_code_id
  // formData.append("event_id",Event_ID);
  // formData.append("event_status",Event_Status_ID);
   formData.append('token', this.token);
  // site_id , comp_code_id, approval_status, eqp_plan_id (site_id compulsory)
 this.rest.majorComponenetDetils(formData).then(data=>{
console.log(data['data'].event_notification[0])
  this.navCtrl.push(ComponentalldetilsPage,{"event_notification_details":data['data'].event_notification[0],"page":"Major Component Details","eventid":item.Event_ID})
  }).catch(err=>{
    alert("Service is down. Please try again later");
   
    console.log(err)
  })


  // this.navCtrl.push(EventdetailsPage)
  }

 
}
