import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { MenuController, ViewController, PopoverController, Slides  } from 'ionic-angular';
import { PopoverPage } from '../popover/popover';
/**
 * Generated class for the TableviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-tableview',
  templateUrl: 'tableview.html',
})
export class TableviewPage {
Family:any;
token:any;
listdata:any;
month:any;
kpiData:any;
analysidSelection:any="all";
timeHeaderName: any="Last Month";
anilizeName :any="All";
selectedData:any = {title:"None Selected",id:0};
TabularCurrentMonthKPI : any;
TabularLastMonthKPI : any;
TabularLast3MonthKPI : any;
TabularLast6MonthKPI : any;


  constructor(public popOver: PopoverController, private screenOrientation: ScreenOrientation,public loadingCtrl:LoadingController,public rest:RestProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.token=JSON.parse(localStorage.getItem('menu'))
    var formData = new FormData();
    formData.append('token', this.token);
    this.rest.kpipermission(formData).then(data=>{
      console.log(data['data'].KPI_Permission[0].admin_bar)
    

       this.TabularCurrentMonthKPI=data['data'].KPI_Permission[0].TabularCurrentMonthKPI;
       this.TabularLastMonthKPI=data['data'].KPI_Permission[0].TabularLastMonthKPI;
       this.TabularLast3MonthKPI=data['data'].KPI_Permission[0].TabularLast3MonthKPI;
       this.TabularLast6MonthKPI=data['data'].KPI_Permission[0].BarLast6MonthKPI;
    })
    console.log( this.TabularCurrentMonthKPI)
  
    this.month="lm";
    let loading = this.loadingCtrl.create({
      content: 'Please wait it may take few to several mins...'
    });
    loading.present();
    this.token=JSON.parse(localStorage.getItem('menu'))
    var formData = new FormData();
    formData.append('token', this.token);

   this.rest.table(formData).then(data=>{
     console.log(data)
    //  this.listdata=data['data'].lastmonthbyEquipment;
     loading.dismiss();
     this.kpiData=data['data'].lastMonth;
     console.log(this.kpiData)
   }).catch(err=>{
     alert("Service is down. Please try again later");
     loading.dismiss();
     console.log(err)
   })
  
 
  }
  myCallbackFunction = function(_params) {
    return new Promise((resolve, reject) => {
      console.log("Hi")
      console.log(_params)
            resolve();
        });
}


openPopover(ev) {

  console.log( this.TabularCurrentMonthKPI)
  let popover = this.popOver.create(PopoverPage, {"TabularCurrentMonthKPI":this.TabularCurrentMonthKPI,
  "TabularLastMonthKPI": this.TabularLastMonthKPI,"TabularLast3MonthKPI":this.TabularLast3MonthKPI,"TabularLast6MonthKPI":this.TabularLast6MonthKPI


});

    popover.present({
      ev: ev
    });

    popover.onDidDismiss(data => {
      this.analysidSelection=data[1];
        this.timeHeaderName

    console.log(data[1]);
    if(data[0]=="mtd"){
      this.token=JSON.parse(localStorage.getItem('menu'))
      var formData = new FormData();
      formData.append('token', this.token);
  
      this.rest.table(formData).then(data=>{
        console.log(data)
      
       
        this.kpiData=data['data'].currentMonth;
        console.log(this.kpiData)
      })
      this.timeHeaderName="MTD"
    }
    else if(data[0]=="three"){
  
      this.token=JSON.parse(localStorage.getItem('menu'))
      var formData = new FormData();
      formData.append('token', this.token);
  
      this.rest.table(formData).then(data=>{
        console.log(data)
      
       
        this.kpiData=data['data'].last3Month;
        console.log(this.kpiData)
      })
  
      this.timeHeaderName="Last 3 Months"
    }
    else if(data[0]=="six"){
      this.token=JSON.parse(localStorage.getItem('menu'))
      var formData = new FormData();
      formData.append('token', this.token);
  
      this.rest.table(formData).then(data=>{
        console.log(data)
      
       
        this.kpiData=data['data'].last6Month;
        console.log(this.kpiData)
      })
      this.timeHeaderName="Last 6 Months"
  
    }
    else{
      this.token=JSON.parse(localStorage.getItem('menu'))
      var formData = new FormData();
      formData.append('token', this.token);
  
      this.rest.table(formData).then(data=>{
        console.log(data)
      
       
        this.kpiData=data['data'].lastMonth;
        console.log(this.kpiData)
      })
      this.timeHeaderName="Last Months"
    }





    if(data!=null){
        this.selectedData = data
    }
  })
}
// openPopover(myevent){
//   //console.log(this.sliderImgs);
//   let popover = this.popOver.create(PopoverPage);
//   //console.log(myevent);
//   popover.present({
//     ev: "myevent"
//   })
// }

}
