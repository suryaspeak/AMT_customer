import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Chart } from 'chart.js';
/**
 * Generated class for the BarresultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-barresult',
  templateUrl: 'barresult.html',
})
export class BarresultPage {
    BarBackData:any;
    analysis:any;
    month:any;
    siteItem:any='';
    arr:any=[];
    sixmonth:any;
    evsix:any;
    LineCurrentMonthKPI : any;
    LineLastMonthKPI : any;
    token: any;
  constructor(public viewCtrl:ViewController,public rest:RestProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.month="Current Month"
    this.BarBackData=this.navParams.get('ev');
    this.sixmonth=this.navParams.get('sixmonth');
    this.evsix=this.navParams.get('evsix')
     
     this.month= localStorage.getItem("locKpiLast")
     this.token=JSON.parse(localStorage.getItem('menu'))
     var formData = new FormData();
     formData.append('token', this.token);
     this.rest.kpipermission(formData).then(data=>{
       console.log(data['data'].KPI_Permission[0].admin_bar)
     
 
        this.LineCurrentMonthKPI=data['data'].KPI_Permission[0].LineCurrentMonthKPI;
        this.LineLastMonthKPI=data['data'].KPI_Permission[0].LineLastMonthKPI;
    
     })
     console.log(this.LineCurrentMonthKPI)
  }

  ionViewDidLoad() {
   console.log("line Pop")
  }
  kpiSubmit(){
    localStorage.setItem("locKpiLast",this.month)
    console.log(this.month)
    console.log(this.analysis)
    this.viewCtrl.dismiss(this.arr)
  }
  mcqAnswer(item){
    console.log(item)
    if(item=="Current Month"){
      this.month="Current Month";
      this.BarBackData=this.navParams.get('ev');
    }else{
      this.month="Last Month";
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
