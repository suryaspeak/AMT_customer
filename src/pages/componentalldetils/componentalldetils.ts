import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the ComponentalldetilsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-componentalldetils',
  templateUrl: 'componentalldetils.html',
})
export class ComponentalldetilsPage {
  notification_details:any;
  token:any;
  desc:any;
  eventid:any;
  statusC : any;
  constructor(public toastCtrl:ToastController,public rest:RestProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.notification_details=this.navParams.get('event_notification_details') ;
    this.eventid=this.navParams.get('eventid');
    console.log(this.notification_details)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ComponentalldetilsPage');
  }
  statusCheck(){
    console.log(this.notification_details.Approval_Status)
  }
  submit(){
      //  if(this.desc){
        console.log(this.eventid)
        this.token=JSON.parse(localStorage.getItem('menu'));
        var formData = new FormData();
        formData.append("eqp_plan_id",this.notification_details.EqpPlanId);
        formData.append("event_status",this.notification_details.Event_Status_ID);
         formData.append("event_id",this.eventid)
        formData.append("approval_status",this.statusC );
        formData.append("approval_reason",this.desc );
        formData.append("token",this.token );
        this.rest.updateStatus(formData).then(data=>{
           this.toastCtrl.create({
            message: 'Status updated Successfully',
            duration: 3000,
            position: 'bottom'
          }).present();
                console.log(data)
        }).then(()=>{
          this.navCtrl.pop();
        })
      

  
  }
}
