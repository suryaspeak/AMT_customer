import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { BarresultPage } from '../barresult/barresult';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the FilterChartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-filter-chart',
  templateUrl: 'filter-chart.html',
})
export class FilterChartPage {
  BarBackData:any;
  analysis:any;
  month:any;
  siteItem:any='';
  arr:any=[];
  sixmonth:any;
  evsix:any;
  monthdes:any;
  token: any;
  prmissin: any;
  pass6 : any;
  pass3: any;
  constructor(public rest: RestProvider,public viewCtrl:ViewController,public navCtrl: NavController, public navParams: NavParams) {
   
     this.pass3=this.navParams.get('pass3');
     this.pass6=this.navParams.get('pass6');
  
    this.month="Last 3 Months"
    this.BarBackData=this.navParams.get('ev');
    this.sixmonth=this.navParams.get('sixmonth');
    this.evsix=this.navParams.get('evsix')
    console.log(this.pass3,this.pass6,this.BarBackData)
 
    this.month=localStorage.getItem("filtermonth")
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilterChartPage');
  }
  kpiSubmit(){
    console.log(this.analysis)
    this.viewCtrl.dismiss(this.arr)
  }
  mcqAnswer(item){
    console.log(item)
    localStorage.setItem("filtermonth",item)
    if(item=="Last 3 Months"){
      this.month="Last 3 Months";
    //  this.BarBackData=[];
    }else{
      this.month="Last 6 Months";
      this.BarBackData=this.navParams.get('evsix');
     
      console.log( this.BarBackData)
    }
    // console.log(item)
  }
  radioChecked(item){
    console.log(this.analysis)
    this.arr={
      "mtbf":item.mtbf,
      "pa":item.physical_availibity,
      "sa":item.service_acuracy,
      "util":item.utilization,
      "name":this.analysis,
      "Month":this.month
    }
    // console.log(this.arr)
 
  }
}
