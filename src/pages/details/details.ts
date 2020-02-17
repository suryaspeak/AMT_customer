import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AlldetailsPage } from '../alldetails/alldetails';
import { ThrowStmt } from '@angular/compiler';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { EventdetailsPage } from '../eventdetails/eventdetails';
import { RestProvider } from '../../providers/rest/rest';
/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

let keys=[];
let values=[];
this.tablevalues=[];

@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  table:any;
  token:any;
  formdate:any='';
  flag:any;
  page:number=1;
  site_id:any;
  eqp_plan_id:any;
  status:any;
  pass:any;
  public pagingEnabled: boolean = true;
  constructor(public navCtrl: NavController, public navParams: NavParams,private screenOrientation: ScreenOrientation, public rest:RestProvider) 
  {
    this.token=JSON.parse(localStorage.getItem('menu'))
  //  this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    this.table=this.navParams.get('selecttable')
    this.flag=this.navParams.get('flag');
    this.site_id=this.navParams.get('site_id');
    this.eqp_plan_id=this.navParams.get('eqp_plan_id');
    this.status=this.navParams.get("status");
    
    console.log(this.table)

    
  }


    public getObjectKey(index)
    {
      // console.log(index)
      return Object.keys(index);
    }

    // formatDate(date) {
    //   var ts = new Date(date);
    //   return ts.toDateString();      
    // }


  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
  }

  alldetails(){
    this.navCtrl.push(AlldetailsPage)
  }

  // ionViewCanLeave() {
  //   this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  // }



eventdetails(EqpPlanId, Event_ID, Event_Status_ID)
{
  if(Event_ID){

    this.token=JSON.parse(localStorage.getItem('menu'));
    var formData = new FormData();
    formData.append("eqp_plan_id",EqpPlanId);
    formData.append("event_id",Event_ID);
    formData.append("event_status",Event_Status_ID);
    formData.append('token', this.token);
  
    this.rest.eventDeatils(formData).then(data=>{
      console.log(data)
      this.navCtrl.push(EventdetailsPage,{"event_notification_details":data['data'],"page":"Event Details"})
    }).catch(err=>{
      alert("Service is down. Please try again later");
      
      console.log(err)
    })
  
  }
  else{
   alert("Event notified is in process. Please wait to view Details")
  }

  }
  temp(infiniteScroll){
    if(infiniteScroll._init==true){

    }
    this.table=this.navParams.get('selecttable')
  }



 
  lodedata(page){
    var formData = new FormData();
     formData.append('token', this.token);
     formData.append('status',this.status);
     formData.append("site_id",this.site_id)
     formData.append("eqp_plan_id",this.eqp_plan_id)
     formData.append("page", page)
      this.rest.progresscompt(formData).then(data=>{
         this.table.push(...data['data'].event_notification.data);
     
     })
  }

  loadmoreRecords(event){
    this.page = this.page + 1;
    this.lodedata(this.page);  
  }



  doInfinite(infiniteScroll: any) {

    this.page = this.page + 1;
    this.pass=this.page
    var formData = new FormData();
    formData.append('token', this.token);
    formData.append('status',this.status);
    formData.append("site_id",this.site_id)
    formData.append("eqp_plan_id",this.eqp_plan_id)
    formData.append("page", this.pass)
    this.rest.progresscompt(formData).then(data=>{
        // this.newposts1 = data;
        // this.newposts = this.newposts1;  
        this.table.push(...data['data'].event_notification.data);
        if (data['data'].event_notification.data.length) {
           
        } else {
            this.pagingEnabled = false;
        }

        infiniteScroll.complete();
    });
}
}
