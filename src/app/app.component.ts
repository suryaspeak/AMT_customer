import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AlertController,NavController } from 'ionic-angular';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { EventPage } from '../pages/event/event';
import { FeedbackPage } from '../pages/feedback/feedback';
import { BreakPage } from '../pages/break/break';
import { ComponentPage } from '../pages/component/component';
import { ViewassetsPage } from '../pages/viewassets/viewassets';
import { TableviewPage } from '../pages/tableview/tableview';
import { BarchatPage } from '../pages/barchat/barchat';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages:any=[];
  testRadioOpen:any;
  testRadioResult:any;
  public dataget;
  public newdat;
  data:any;
  banner:any;
  token:any;
  
  count:any;
  sub:any=[];
  constructor(public alertCtrl: AlertController,public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.data=JSON.parse(localStorage.getItem('home'));
   
    this.token=JSON.parse(localStorage.getItem('menu'))
    console.log(this.token)
    
    

  }

  initializeApp() {
    this.platform.ready().then(() => {
      setInterval(() => { 
        if(localStorage.getItem('home')){
         
          this.pages=JSON.parse(localStorage.getItem('home'))
        }else{
           console.log("NEW D")
        }
              // Now the "this" still references the component
     }, 1000);
      this.statusBar.backgroundColorByHexString('#CCCC00');
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  logout(){
    this.nav.setRoot(LoginPage)
  }
  openPage(page) {
    console.log(page.id)
    if(page.id=="2"){
      this.nav.push(BreakPage)
    }
    if(page.id=="8"){
      this.nav.push(ViewassetsPage)
    }
    if(page.id=="10"){
      this.nav.push(FeedbackPage)
    }
    if(page.id=="1"){
      this.showkpi()
    }
    if(page.id=='9'){ 
      this.showEvent()
    }
    if(page.id=='7'){ 
      this.showcomponent()
    }
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    // this.nav.setRoot(page.component);
  }
  showEvent() {
    console.log(this.data)
    let alert = this.alertCtrl.create();
    alert.setTitle('Select');
    for(let i=0;i<this.data.length;i++){
    
    //  console.log(this.data[i].sub_menu)
     if(this.data[i].id=="9"){
       this.sub=this.data[i].sub_menu

        if(this.sub.length==1){
        alert.addInput({
          type: 'radio',
          label: 'In Progress and Completed Activities',
          value: 'ipc',
          checked: true
        },
        );
        alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        if (data=='ipc'){
          var formData = new FormData();
          formData.append('token', this.token);
          // this.rest.progresscompt(formData).then(data=>{
          //   console.log(data)
          // })
          this.nav.push(EventPage,{check:"ipc"})
        }
        else if(data=='yts'){
           
          
          this.nav.push(EventPage,{check:"yts"})
        }
        else {
          this.nav.push(EventPage,{check:"mjc"})
        }
        this.testRadioOpen = false;
        this.testRadioResult = data;
      }
    });
    alert.present();
       }
       else if (this.sub.length==2) {
        alert.addInput({
          type: 'radio',
          label: 'In Progress and Completed Activities',
          value: 'ipc',
          checked: true
        },
        );
         
    alert.addInput({
      type: 'radio',
      label: 'Upcoming Maintanence Activities',
      value: 'yts',
     
    });
    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        if (data=='ipc'){
          var formData = new FormData();
          formData.append('token', this.token);
          // this.rest.progresscompt(formData).then(data=>{
          //   console.log(data)
          // })
          this.nav.push(EventPage,{check:"ipc"})
        }
        else if(data=='yts'){
           
          
          this.nav.push(EventPage,{check:"yts"})
        }
        else {
          this.nav.push(EventPage,{check:"mjc"})
        }
        this.testRadioOpen = false;
        this.testRadioResult = data;
      }
    });
    alert.present();
       }
      
     }
    }

   

  
    // alert.addInput({
    //   type: 'radio',
    //   label: 'Major Component Jobs',
    //   value: 'mjc',
     
    // });
    // alert.addButton('Cancel');
    // alert.addButton({
    //   text: 'OK',
    //   handler: data => {
    //     if (data=='ipc'){
    //       var formData = new FormData();
    //       formData.append('token', this.token);
    //       // this.rest.progresscompt(formData).then(data=>{
    //       //   console.log(data)
    //       // })
    //       this.navCtrl.push(EventPage,{check:"ipc"})
    //     }
    //     else if(data=='yts'){
           
          
    //       this.navCtrl.push(EventPage,{check:"yts"})
    //     }
    //     else {
    //       this.navCtrl.push(EventPage,{check:"mjc"})
    //     }
    //     this.testRadioOpen = false;
    //     this.testRadioResult = data;
    //   }
    // });
    // alert.present();
  }
  home(){
      this.nav.setRoot(HomePage)
  }
  showcomponent() {
    let alert = this.alertCtrl.create();
    alert.setTitle('select');

    alert.addInput({
      type: 'radio',
      label: 'Component Current Status',
      value: 'ccs',
      checked: true
    },
    );
    alert.addInput({
      type: 'radio',
      label: 'Component History',
      value: 'ch',
     
    });
     alert.addInput({
       type: 'radio',
      label: 'Major Components',
       value: 'mjc',
     
    });
    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        if (data=='ccs'){
          var formData = new FormData();
          formData.append('token', this.token);
          // this.rest.progresscompt(formData).then(data=>{
          //   console.log(data)
          // })
          this.nav.push(ComponentPage,{check:"ccs"})
        }
         else if(data=='ch'){
           
          
          this.nav.push(ComponentPage,{check:"ch"})
         }
        else {
          this.nav.push(ComponentPage,{check:"mjc"})
        }
        this.testRadioOpen = false;
        this.testRadioResult = data;
      }
    });
    alert.present();
  }
  showkpi() {
    let alert = this.alertCtrl.create();
    alert.setTitle('select');

    alert.addInput({
      type: 'radio',
      label: 'Tabular View',
      value: 'tv',
      checked: true
    },
    );
    alert.addInput({
      type: 'radio',
      label: 'Line Chart View',
      value: 'lc',
     
    });
     alert.addInput({
       type: 'radio',
      label: 'Bar Graph View',
       value: 'bg',
     
    });
    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        if (data=='tv'){
          var formData = new FormData();
          formData.append('token', this.token);
         
          this.nav.push(TableviewPage,{check:"tv"})
        }
         else if(data=='lc'){
           
          
          this.nav.push(DashboardPage,{check:"lc"})
         }
        else {
          this.nav.push(BarchatPage)
        }
        this.testRadioOpen = false;
        this.testRadioResult = data;
      }
    });
    alert.present();
  }
  // notification(){
  //   this.navCtrl.push(NotificationPage)
  // }
}
