import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the YettostartlistdetilsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-yettostartlistdetils',
  templateUrl: 'yettostartlistdetils.html',
})
export class YettostartlistdetilsPage {
  pageget:any;
  notification_details;
  pagecheck:any;
  status:any;
  desc:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  this.notification_details=this.navParams.get('event_notification_details');
  console.log(this.pageget)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad YettostartlistdetilsPage');
  }

}
