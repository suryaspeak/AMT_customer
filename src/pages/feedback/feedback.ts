import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from './../../providers/rest/rest';
import { TypeScriptEmitter } from '@angular/compiler';
import { stringify } from '@angular/core/src/util';
import { AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
/**
 * Generated class for the FeedbackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {
fb:any;
token:any;
rate:any=[];
mag:any;
arr:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public rest:RestProvider,public alertCtrl: AlertController) {
    this.token=JSON.parse(localStorage.getItem('menu'))
    var formData = new FormData();
    formData.append('token',this.token);
    this.rest.feedbackpermission(formData).then(data=>{
      console.log(data)
    })
    
    this.rest.feedback(formData).then(data=>{
      this.fb=data['data'].question;
       
    }).catch(err=>{
      alert("Service is down. Please try again later");
      
      console.log(err)
    })
 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedbackPage');
  }
  onModelChange(item){
    console.log(item)
  }
  subhmit(){
   
      for(let temp=0;temp<this.fb.length;temp++){
        console.log(this.fb[temp].id)
          this.arr.push({id:this.fb[temp].id,ans:this.fb[temp].answer,rating:this.fb[temp].star_ratting})

      }
  console.log(JSON.stringify(this.arr))
    var formData = new FormData();
    formData.append('token',this.token);
    formData.append('feedans',JSON.stringify(this.arr));
    this.rest.feedbackans(formData).then(dd=>{
      console.log(dd)
      alert("Feedback submitted successfuly")
    })
    this.navCtrl.setRoot(HomePage)

  }
  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'Status submited',
      subTitle: 'Your status has been submited succesfully',
      buttons: [{
        text: 'ok',
        handler: data => {
          this.navCtrl.setRoot(HomePage)
        }
      },]
    });
    alert.present();
  }
}
