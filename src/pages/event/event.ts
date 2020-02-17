import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { DetailsPage } from '../details/details';
import { RestProvider } from '../../providers/rest/rest';
import { EventdetailsPage } from '../eventdetails/eventdetails';
import { YettostartlistPage } from '../yettostartlist/yettostartlist';

/**
 * Generated class for the EventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-event',
  templateUrl: 'event.html',
})
export class EventPage {
  public check;
  checkipc:boolean=false;
  checkyts:boolean=false;
  // others:boolean=false;
  others:any;
  select:any;
  status:any=null;
  token:any;
   name:any;
   sub:any;
   equipmentget:any;
   desc:any;
   idget:any;
   todate:any='';
   formdate:any='';
   equipmentselect:any=[];
   eventstatusd:any;
   eventstatusarr:any=[];
   conponentcode:any;
   component_code:any;
   approval_status:any;
   syettostart:any;
   yes:any="y";
   siteId: any;
  constructor(public toastCtrl:ToastController,public loadingCtrl:LoadingController,public alertCtrl:AlertController,public rest:RestProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.check=this.navParams.get('check')
  

    if (this.check=='ipc'){
      this.checkipc=true;
     
    
    }
    else if(this.check=='yts'){
     this.checkipc=false;
    }
    else {
      this.others='major';
    }


   
      let loading = this.loadingCtrl.create({
        content: 'Please wait it may take few to several mins...'
      });
      loading.present();

      this.token=JSON.parse(localStorage.getItem('menu'))
      
      var formData = new FormData();
      formData.append('token', this.token);
      
      this.rest.site(formData).then(data=>{
        this.name=data['data'].site;
        this.siteId=this.name[0].SiteId;
        console.log(this.siteId)
        this.onChange(this.siteId)


       }).then(()=>{
      var formData = new FormData();
      formData.append('token', this.token);
      
      this.rest.componentCode(formData).then(data=>{
        this.conponentcode=data['data'].component;
  
       loading.dismiss();
     }).catch(err=>{
      alert("Service is down. Please try again later");
      loading.dismiss();

    })
     })

     var formData = new FormData();
     formData.append('token', this.token);
      this.rest.eventStatus(formData).then(data=>{

        this.eventstatusd=data['data'].event_status;
    

      }).catch(err=>{
        alert("Service is down. Please try again later");
        loading.dismiss();

      })

  }
  onChange(id){
    let loading = this.loadingCtrl.create({
      content: 'Please wait it may take few to several mins...'
    });
    loading.present();
 
    this.idget=id;
    var formData = new FormData();
    formData.append('token', this.token);
    formData.append('id',id)
    this.rest.equtment(formData).then(datsat=>{
    
      this.sub=datsat['data'].equipment;
      loading.dismiss();
    }).catch(err=>{
      alert("Service is down. Please try again later");
      loading.dismiss();
   
    })
  
  }


  onset(ite){
    this.equipmentget=ite;
    // console.log(this.equipmentget)
    this.desc=this.equipmentget + ",Breakdown Machine";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventPagegh');
  }

  isReadonly() {
    return this.isReadonly;   //return true/false 
  }


  details(){
 
    let loading = this.loadingCtrl.create({
      content: 'Please wait it may take few to several mins...'
    });
    loading.present();
       this.idget=this.siteId;
     var formData = new FormData();
     formData.append('token', this.token);
     formData.append('status',JSON.stringify(this.status));
     formData.append("site_id",this.idget)
     formData.append("eqp_plan_id",JSON.stringify(this.equipmentselect))

     if(this.others == 'major')
     {
  
      formData.append("comp_code_id",JSON.stringify(this.component_code))
      formData.append("approval_status",JSON.stringify(this.approval_status))

     

        this.rest.majorComponenet(formData).then(data=>{
          if(data['count']==0){
            alert("No data found")
          }else{
            this.navCtrl.push(DetailsPage,{"selecttable":data['data'].event_notification.data, "flag":'major',"site_id":this.idget,"eqp_plan_id":JSON.stringify(this.equipmentselect),"status":JSON.stringify(this.status)})
            
          }
         
         
        }).then(()=>{
          loading.dismiss();
        })

     } else {
      formData.append("page","1")
      formData.append("enddate",this.todate)
      formData.append("startdate",this.formdate)
        this.rest.progresscompt(formData).then(data=>{
          if(data['count']==0){
            alert("No data found")
          }else{
   
             this.navCtrl.push(DetailsPage,{"selecttable":data['data'].event_notification.data,"site_id":this.idget,"eqp_plan_id":JSON.stringify(this.equipmentselect),"status":JSON.stringify(this.status)})
          }
  
          
        }).then(()=>{
          loading.dismiss();
        })
       
     } 

   

  }
  yettostart(){
    console.log(this.siteId)
    let loading = this.loadingCtrl.create({
      content: 'Please wait it may take few to several mins...'
    });
  
    loading.present();
 
    this.equipmentselect == undefined ? '' : this.equipmentselect;
     var formData = new FormData();


    formData.append('token', this.token);
    formData.append('status',JSON.stringify(this.status));

    formData.append("site_id",this.idget)
    formData.append("eqp_plan_id",JSON.stringify(this.equipmentselect))
    this.rest.viewEventYTS(formData).then(data=>{
  
       if(data['count']=="0"){
        let toast = this.toastCtrl.create({
          message: 'Data not found',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
        loading.dismiss();
       }
       else{
       
        this.syettostart=data['data'].event_notification;
        this.navCtrl.push(YettostartlistPage,{"data":this.syettostart})
        loading.dismiss();
       }
      
   
       
    }).catch(err=>{
      alert("Service is down. Please try again later");
      loading.dismiss();
    
    })

  }
 
 
}
