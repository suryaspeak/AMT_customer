import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController, LoadingController, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AlertController } from 'ionic-angular';
import { RestProvider } from './../../providers/rest/rest';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
 email:any;
 password:any;
 token:any;
 dataaccessmenu:any;
  constructor(public toastController:ToastController,public loadingCtrl:LoadingController,public rest:RestProvider,public navCtrl: NavController, public navParams: NavParams,public menu:MenuController,public alertCtrl: AlertController) {
  this.menu.swipeEnable(false);
 

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  openDashboardPage() {
    this.navCtrl.setRoot(HomePage);

  }

  login(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait it may take few to several mins...'
    });
  
    loading.present();
   
    var formData = new FormData();
        formData.append('email', this.email);
        formData.append('password', this.password);
          this.rest.logindata(formData).then(ddat=>{
              console.log(ddat)
  
            if(ddat['status']=="active" && ddat['data'].user.user_type=="Customer"){
                this.token=ddat['data'].token;
            
                var formData = new FormData();
                formData.append('token', this.token);

                formData.append('activity_datetime',new Date().toISOString())
                this.rest.userlog(formData).then(dd=>{
                  console.log(dd)
                })
               this.rest.useraccess(formData).then(data=>{
             
                 this.dataaccessmenu=data['menu']
                 localStorage.setItem("menu",JSON.stringify(this.token))
                 loading.dismiss();
                 localStorage.setItem("home",JSON.stringify(this.dataaccessmenu));
                 this.navCtrl.setRoot(HomePage)
               }).catch(err=>{
                alert("Service is down. Please try again later");
                loading.dismiss();
                console.log(err)
              })
              
            }
            else{
              const toast = this.toastController.create({
                message: 'Invalid Username or password..',
                duration: 2000
              });
              toast.present();
              loading.dismiss();
            }
          
     })
    
  }


}
