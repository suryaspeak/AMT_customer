import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { ThrowStmt } from '@angular/compiler';

/**
 * Generated class for the AssetsdetilsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-assetsdetils',
  templateUrl: 'assetsdetils.html',
})
export class AssetsdetilsPage {
  dataget:any;
  branchname:any;
  equ:any;
  eqp_name:any;
  modelno:any;
  serial:any;
  mani:any;
  OriginalCommissionDate:any;
  dntime:any;
  evdesc:any;
  assigneng:any;
  Expected_Up_Time:any;
  engnieer_name:any;
  // new
  status=null;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.dataget=this.navParams.get('data');

    console.log(this.dataget)

    this.branchname=this.dataget.eqp_details[0].Branch;
    this.equ=this.dataget.eqp_details[0].Site;
    this.Expected_Up_Time=this.dataget.eqp_details[1].Expected_Up_Time
    this.engnieer_name=this.dataget.eqp_details[1].engnieer_name
    this.eqp_name=this.dataget.eqp_details[1].EqpPlan;
    this.modelno=this.dataget.eqp_details[1].Model;
    this.serial=this.dataget.eqp_details[1].SerialNumber;
    this.mani=this.dataget.eqp_details[1].Manufacturer
    this.OriginalCommissionDate=this.dataget.eqp_details[1].OriginalCommissionDate;

    this.status = this.dataget.eqp_details[1].equipment_status;




    this.dntime=this.dataget.eqp_details[1].Actual_Down_Time;
    this.evdesc=this.dataget.eqp_details[1].Event_Description;
    

    // this.assigneng=this.dataget.
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad AssetsdetilsPage');
  }

}
