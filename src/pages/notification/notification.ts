import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {
  token:any;
  listNotification: any;
  constructor(public alertCtrl:AlertController ,public rest:RestProvider,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.token=JSON.parse(localStorage.getItem('menu'))
    console.log(this.token)
    var formData = new FormData();
    formData.append('token', this.token);
    this.rest.Notiflist(formData).then(data=>{
      this.listNotification=data['data'].notification
      
      console.log(data)
    })
    console.log('ionViewDidLoad NotificationPage');
  }
  Notification(item) {
    console.log(item)
    const alert = this.alertCtrl.create({
      title: "Do you want to delete?",
      subTitle: item.name+"for equipment"+item.EqpPlan,
      buttons: [ {
        text: 'Yes',
        handler: () => {
          var formData = new FormData();
          formData.append('token', this.token);
          formData.append('notification_id', item.notification_id);

          this.rest.notificationSeen(formData).then(data=>{


            var formData = new FormData();
            formData.append('token', this.token);
            this.rest.Notiflist(formData).then(data=>{
              this.listNotification=data['data'].notification
             
            })
            console.log(this.listNotification)
          })
          // this.navCtrl
        }
      },
      {
        text: 'No',
        handler: () => {
           
        }
      }
    
    ]
    });
    alert.present();
  }
}
