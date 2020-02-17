import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { RestProvider } from './../../providers/rest/rest';
import { HomePage } from '../home/home';
/**
 * Generated class for the BreakPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-break',
  templateUrl: 'break.html',
})
export class BreakPage {
  token:any;
  name:any;
   sub:any;
   equipmentget:any;
   desc:any;
   idget:any;
   locaiton:any;
   locationid:any='';
  constructor(public toastCtrl:ToastController,public loadingCtrl:LoadingController,public alertCtrl:AlertController,public rest:RestProvider,public navCtrl: NavController, public navParams: NavParams) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait it may take few to several mins...'
    });
    loading.present();
     
    console.log(localStorage.getItem('menu'));
    this.token=JSON.parse(localStorage.getItem('menu'))
    var formData = new FormData();
    formData.append('token', this.token);
    
    this.rest.site(formData).then(data=>{
      this.name=data['data'].site;
     console.log(data)
     loading.dismiss();
   }).catch(err=>{
    alert("Service is down. Pleash try again later");
    loading.dismiss();
    console.log(err)
  })
 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BreakPage');
  }
  onChange(id){
    this.idget=id;
    var formData = new FormData();
    formData.append('token', this.token);
    formData.append('id',id)
    this.rest.equtment(formData).then(datsat=>{
      console.log(datsat)
      this.sub=datsat['data'].equipment;
    }).then(()=>{
      var formData = new FormData();
      formData.append('token', this.token);
      formData.append('id',id)
      console.log(id)
       this.rest.locationBySite(formData).then(data=>{
        this.locaiton=data['data'].location;
         if(this.locaiton.length=="0"){
       
          const toast = this.toastCtrl.create({
           message: 'No Location Found for this site',
           duration: 3000
         });
         toast.present();
         }
        
       console.log("gg"+this.locaiton.length)
       }).catch(err=>{
        alert("Service is down. Pleash try again later");
       
        console.log(err)
      })
     })
    console.log(id)
  }
  loc(item){
    this.locationid=item;
    if(this.locationid.length==0){
     
    }
    console.log(item)
  }

  onset(ite,item){
    this.equipmentget=ite;
    console.log(this.equipmentget)
    this.desc=item + ",Breakdown Machine";
  }

  submit(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait it may take few to several mins...'
    });
    loading.present();
    var formData = new FormData();
    formData.append('token', this.token);
    formData.append('siteid', this.idget);
    formData.append('locid', this.locationid);
    formData.append('eqpanid', this.equipmentget);
    formData.append('desc',this.desc)
   this.rest.event(formData).then(data=>{
     console.log(data)
     console.log(data)
     if(data['data'].event_notification=="Success"){
      loading.dismiss();
      let alert = this.alertCtrl.create({
        title: "BreakDown Notified Successfully",
        // subTitle: '10% of battery remaining',
        buttons: [{
          text: 'Ok',
         
          handler: () => {
           this.navCtrl.setRoot(HomePage)
          }
        }]
        
    });
    alert.present();
       
     }
     else{
      loading.dismiss();
     }
    
   
   }).catch(err=>{
    alert("Service is down. Pleash try again later");
   
    console.log(err)
  })
  }
 
  
}
