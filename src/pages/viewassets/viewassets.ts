import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { RestProvider } from './../../providers/rest/rest';
import { DetailsPage } from '../details/details';
import { AssetsdetilsPage } from '../assetsdetils/assetsdetils';
/**
 * Generated class for the ViewassetsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-viewassets',
  templateUrl: 'viewassets.html',
})
export class ViewassetsPage {
  token:any;
  name:any;
  idget:any;
  sub:any;
  equipmentget:any;
  datpass:any;
  selected:any;
  arrtemp:any=[];
  fleet:any;
  fleetselect:any=[];
  Statusselect:any=null;
  constructor(public toastCtrl:ToastController,public loadingCtrl:LoadingController,public rest:RestProvider,public navCtrl: NavController, public navParams: NavParams) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait it may take few to several mins...'
    });
    loading.present();
    this.token=JSON.parse(localStorage.getItem('menu'))
    var formData = new FormData();
    formData.append('token', this.token);
    this.rest.site(formData).then(data=>{
      this.name=data['data'].site;
     console.log(data)
    
   }).then(()=>{
     this.idget=this.name[0].SiteId;
     this.selected=this.name[0].Site;
     console.log(this.name[0].id)
     var formDatas = new FormData();
     formDatas.append('token', this.token);
    formDatas.append('site_id',this.name[0].SiteId)
    this.rest.ewtbs(formDatas).then(datsat=>{
      console.log(datsat)
      this.sub=datsat['data'].equipment;

    })
   }).then(()=>{
    formData.append('token', this.token);
    formData.append('site_id',this.name[0].SiteId)
    this.rest.fleetbysite(formData).then(datage=>{
      this.fleet=datage['data'].fleet_details;
      console.log(datage['data'].fleet_details)
      loading.dismiss();
    }).catch(err=>{
      alert("Service is down. Pleash try again later");
      loading.dismiss();
      console.log(err)
    })
   })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewassetsPage');
  }
  onChange(id){
    const loader = this.loadingCtrl.create({
      content: "Please wait it may take few to several mins...",
    
    });
    this.idget=id;
    var formData = new FormData();
    formData.append('token', this.token);
    formData.append('site_id',id)
    this.rest.ewtbs(formData).then(datsat=>{
      console.log(datsat)
      this.sub=datsat['data'].equipment;
    }).then(data=>{
      formData.append('token', this.token);
      formData.append('site_id',id)
      this.rest.fleetbysite(formData).then(datage=>{
        this.fleet=datage['data'].fleet_details;
        console.log(datage['data'].fleet_details)

      }).then(()=>{
        loader.dismiss();
      })
    })
    console.log(id)
  }
  onset(ite,item){

    if(item.Event_ID){
      const loader = this.loadingCtrl.create({
        content: "Please wait it may take few to several mins...",
       
      });
      this.equipmentget=ite;
    
      var formData = new FormData();
      formData.append('token', this.token);
      formData.append('id', this.idget);
      formData.append('eqp_plan_id',this.equipmentget);
      formData.append('Event_ID',item.Event_ID);
      this.rest.viewasset(formData).then(data=>{
        //console.log(data['data'].eqp_details);
  
        this.datpass=data['data']
      }).then(()=>{
        loader.dismiss();
           this.navCtrl.push(AssetsdetilsPage,{"data":this.datpass})
      }).catch(err=>{
        alert("Service is down. Please try again later");
       
        console.log(err)
      })
    }
    else{
      alert("The event notification is in process. Please wait sometime to check the details..")
    }
 
  }
  onChangeFleet(item){
    const loader = this.loadingCtrl.create({
      content: "Please wait it may take few to several mins...",
     
    });
   
    var formData = new FormData();
    formData.append('token', this.token);
    formData.append('id', this.idget);
    // formData.append('eqp_plan_id',this.equipmentget);
    formData.append('FleetId',item)
    this.rest.ewtbs(formData).then(datsat=>{
      console.log(datsat)
      this.sub=datsat['data'].equipment;

    }).then(()=>{
      loader.dismiss();
    }).catch(err=>{
      alert("Service is down. Please try again later");
     
      console.log(err)
    })
    
  }
  onChangeStatus(item){
    console.log(item)
  }

  submit(){
    const loader = this.loadingCtrl.create({
      content: "Please wait it may take few to several mins...",
     
    });
    loader.present();
  
    // site_id,status,FleetId
    var formDatas = new FormData();
    formDatas.append('token', this.token);
    formDatas.append('FleetId',JSON.stringify(this.fleetselect))
    formDatas.append('site_id',this.idget);
    formDatas.append('status',this.Statusselect);
      this.rest.ewtbs(formDatas).then(datsat=>{
             console.log(datsat)
       
         if(datsat['data'].equipment.length==0){
         
          let toast = this.toastCtrl.create({
            message: 'No data found',
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
         }
         else{
         
          this.sub=datsat['data'].equipment;
         }
        console.log(this.sub.length)
        
      }).then(()=>{
         loader.dismiss();
      })
  }
}
