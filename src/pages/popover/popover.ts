


import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,PopoverController } from 'ionic-angular';

import { HomePage } from '../home/home';

/**
 * Generated class for the PopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {
  public show: boolean;
  public slideslow:boolean=false;
  public month="lm";
  analysis:any="all";
  callback:any;
  items:any;
  TabularCurrentMonthKPI : any;
TabularLastMonthKPI : any;
TabularLast3MonthKPI : any;
TabularLast6MonthKPI : any;
  constructor(public viewController:ViewController,public popOver: PopoverController,public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.callback = this.navParams.get("ev")
    this.items = this.navParams.get('listData');
    console.log(this.items)
      console.log(this.callback)
      this.month=localStorage.getItem("month")
      this.analysis=localStorage.getItem("analysis")

      this.TabularCurrentMonthKPI=this.navParams.get('TabularCurrentMonthKPI');
      this.TabularLastMonthKPI=this.navParams.get('TabularLastMonthKPI');
      this.TabularLast3MonthKPI=this.navParams.get('TabularLast3MonthKPI');
      this.TabularLast6MonthKPI=this.navParams.get('TabularLast6MonthKPI');
   console.log( this.TabularCurrentMonthKPI)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverPage');
  }

  kpiSubmit(item) {
    localStorage.setItem("month",this.month)
    localStorage.setItem("analysis",this.analysis)
    var arr=[];
    arr=[this.month,this.analysis]
    let data = arr;
    this.viewCtrl.dismiss(data);
  }
  }

  


