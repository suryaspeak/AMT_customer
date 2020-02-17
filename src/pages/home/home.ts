import { Component } from '@angular/core';
import { NavController,MenuController,NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { EventPage } from '../event/event';
import { FeedbackPage } from '../feedback/feedback';
import { LoginPage } from '../login/login';
import { DashboardPage } from '../dashboard/dashboard';
import { RestProvider } from './../../providers/rest/rest';
import { HistoryPage } from '../history/history';
import { ProfilePage } from '../profile/profile';
import { BreakPage } from '../break/break';
import { ViewassetsPage } from '../viewassets/viewassets';
import { ComponentPage } from '../component/component';
import { BarchatPage } from '../barchat/barchat';
import { TableviewPage } from '../tableview/tableview';
import { NotificationPage } from '../notification/notification';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public dataget;
  public newdat;
  data:any;
  banner:any;
  token:any;
  testRadioOpen:any;
  testRadioResult:any;
  count:any;
  sub:any=[];
  menu_id:any;
  KPI_Permission:any;
  KPI:any;
  customer_bar:any;
  constructor(public nav:NavParams,public rest:RestProvider,public navCtrl: NavController, public menu:MenuController,public alertCtrl: AlertController) {
   this.data=JSON.parse(localStorage.getItem('home'));
   
   this.token=JSON.parse(localStorage.getItem('menu'))
   console.log(this.token)
   var formData = new FormData();
   formData.append('token', this.token);
    this.rest.slider(formData).then(data=>{
      this.banner=data['data'].slider;
      console.log(this.banner)
    }).catch(err=>{
      alert("Service is down. Please try again later");
     
      console.log(err)
    })
    this.rest.NotificationCount(formData).then(data=>{
      this.count=data['data'].notification_count
      console.log(data)
    })
   console.log(this.data)
    this.menu.swipeEnable(true);


    setInterval(()=>{
        this.notifi();
    },3000)
    
   }



   notifi(){
    this.token=JSON.parse(localStorage.getItem('menu'))
    console.log(this.token)
    var formData = new FormData();
    formData.append('token', this.token);
    this.rest.NotificationCount(formData).then(data=>{
      this.count=data['data'].notification_count;
      console.log(data)
    })
  
    
   }
   
  doConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Do you really want to log out?',
     
      buttons: [
        {
          text: 'no',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'yes',
          handler: () => {
            localStorage.removeItem('home');
            localStorage.removeItem('menu');
          this.navCtrl.setRoot(LoginPage)
          }
        }
      ]
    });
    confirm.present()
  }


  dashboard(item){
 console.log(item)
    if(item=="2"){
      this.navCtrl.push(BreakPage)
    }
    if(item=="8"){
      this.navCtrl.push(ViewassetsPage)
    }
    if(item=="10"){
      this.navCtrl.push(FeedbackPage)
    }
    if(item=="1"){
      this.showkpi()
    }
    if(item=='9'){ 
      this.showEvent()
    }
    if(item=='7'){ 
      this.showcomponent()
    }
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
          this.navCtrl.push(EventPage,{check:"ipc"})
        }
        else if(data=='yts'){
           
          
          this.navCtrl.push(EventPage,{check:"yts"})
        }
        else {
          this.navCtrl.push(EventPage,{check:"mjc"})
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
          this.navCtrl.push(EventPage,{check:"ipc"})
        }
        else if(data=='yts'){
           
          
          this.navCtrl.push(EventPage,{check:"yts"})
        }
        else {
          this.navCtrl.push(EventPage,{check:"mjc"})
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
  showcomponent() {
    console.log("hi")
    let alert = this.alertCtrl.create();
    alert.setTitle('select');
    for(let i=0;i<this.data.length;i++){
      if(this.data[i].id=="7"){
        this.sub=this.data[i].sub_menu
        // this.menu_id= this.sub.menu_id
        console.log(this.sub)
        // if(this.sub.length==1){
        //   alert.addInput({
        //     type: 'radio',
        //     label: 'Component Current Status',
        //     value: 'ccs',
        //     checked: true
        //   },
        //   );
        //   alert.addButton('Cancel');
        //   alert.addButton({
        //     text: 'OK',
        //     handler: data => {
        //       if (data=='ccs'){
        //         var formData = new FormData();
        //         formData.append('token', this.token);
        //         // this.rest.progresscompt(formData).then(data=>{
        //         //   console.log(data)
        //         // })
        //         this.navCtrl.push(ComponentPage,{check:"ccs"})
        //       }
        //        else if(data=='ch'){
                 
                
        //         this.navCtrl.push(ComponentPage,{check:"ch"})
        //        }
        //       else {
        //         this.navCtrl.push(ComponentPage,{check:"mjc"})
        //       }
        //       this.testRadioOpen = false;
        //       this.testRadioResult = data;
        //     }
        //   });
        //   alert.present();
        // }
        if(this.sub.length>0){
          for(let i=0;i<this.sub.length;i++){
           console.log(this.sub)
           if(this.sub[i].menu_id==20){

               console.log("Conponent Current Status")
               alert.addInput({
                    type: 'radio',
                    label: 'Component Current Status',
                    value: 'ccs',
                    checked: true
                  },
                  );
                  // alert.addButton('Cancel');
                  // alert.addButton({
                  //   text: 'OK',
                  //   handler: data => {
                  //     if (data=='ccs'){
                  //       var formData = new FormData();
                  //       formData.append('token', this.token);
                  //       this.rest.progresscompt(formData).then(data=>{
                  //         console.log(data)
                  //       })
                  //       this.navCtrl.push(ComponentPage,{check:"ccs"})
                  //     }
                      
                      
                  //     this.testRadioOpen = false;
                  //     this.testRadioResult = data;
                  //   }
                  // });
                  // alert.present();
           }
          //  end
           if(this.sub[i].menu_id==22){

            console.log("Major Components")
            
               alert.addInput({
             type: 'radio',
            label: 'Major Components',
             value: 'mjc',
           
          });
          
            
        }
        if(this.sub[i].menu_id==21){

          console.log("Component History")
          
             alert.addInput({
           type: 'radio',
          label: 'Component History',
           value: 'ch',
         
        });
        
          
      }
       
        //   alert.addButton({
        //     text: 'OK',
        //     handler: data => {
        //       if (data=='ccs'){
        //         var formData = new FormData();
        //         formData.append('token', this.token);
        //         // this.rest.progresscompt(formData).then(data=>{
        //         //   console.log(data)
        //         // })
        //         this.navCtrl.push(ComponentPage,{check:"ccs"})
        //       }
        //        else if(data=='ch'){
                 
                
        //         this.navCtrl.push(ComponentPage,{check:"ch"})
        //        }
        //       else {
        //         this.navCtrl.push(ComponentPage,{check:"mjc"})
        //       }
        //       this.testRadioOpen = false;
        //       this.testRadioResult = data;
        //     }
        //   });
        //   alert.present();
        // }
        // end
          }
          
        }
        
        // if(this.sub.length==3){
        //   alert.addInput({
        //     type: 'radio',
        //     label: 'Component Current Status',
        //     value: 'ccs',
        //     checked: true
        //   },
        //   );
        //   alert.addInput({
        //     type: 'radio',
        //     label: 'Component History',
        //     value: 'ch',
           
        //   });
        //    alert.addInput({
        //      type: 'radio',
        //     label: 'Major Components',
        //      value: 'mjc',
           
        //   });
        //   alert.addButton('Cancel');
        //   alert.addButton({
        //     text: 'OK',
        //     handler: data => {
        //       if (data=='ccs'){
        //         var formData = new FormData();
        //         formData.append('token', this.token);
        //         // this.rest.progresscompt(formData).then(data=>{
        //         //   console.log(data)
        //         // })
        //         this.navCtrl.push(ComponentPage,{check:"ccs"})
        //       }
        //        else if(data=='ch'){
                 
                
        //         this.navCtrl.push(ComponentPage,{check:"ch"})
        //        }
        //       else {
        //         this.navCtrl.push(ComponentPage,{check:"mjc"})
        //       }
        //       this.testRadioOpen = false;
        //       this.testRadioResult = data;
        //     }
        //   });
        //   alert.present();
        // }
      }
    }








    // alert.addInput({
    //   type: 'radio',
    //   label: 'Component Current Status',
    //   value: 'ccs',
    //   checked: true
    // },
    // );
    // alert.addInput({
    //   type: 'radio',
    //   label: 'Component History',
    //   value: 'ch',
     
    // });
    //  alert.addInput({
    //    type: 'radio',
    //   label: 'Major Components',
    //    value: 'mjc',
     
    // });
    // alert.addButton('Cancel');
    // alert.addButton({
    //   text: 'OK',
    //   handler: data => {
    //     if (data=='ccs'){
    //       var formData = new FormData();
    //       formData.append('token', this.token);
    //       // this.rest.progresscompt(formData).then(data=>{
    //       //   console.log(data)
    //       // })
    //       this.navCtrl.push(ComponentPage,{check:"ccs"})
    //     }
    //      else if(data=='ch'){
           
          
    //       this.navCtrl.push(ComponentPage,{check:"ch"})
    //      }
    //     else {
    //       this.navCtrl.push(ComponentPage,{check:"mjc"})
    //     }
    //     this.testRadioOpen = false;
    //     this.testRadioResult = data;
    //   }
    // });
    // alert.present();
    alert.addButton('Cancel');
          alert.addButton({
            text: 'OK',
            handler: data => {
              if (data=='ccs'){
                // var formData = new FormData();
                // formData.append('token', this.token);
             
                this.navCtrl.push(ComponentPage,{check:"ccs"})
              }
               else if(data=='ch'){
                 
                
                this.navCtrl.push(ComponentPage,{check:"ch"})
               }
              else {
                this.navCtrl.push(ComponentPage,{check:"mjc"})
              }
              this.testRadioOpen = false;
              this.testRadioResult = data;
            }
          });
          alert.present();
  }
  showkpi() {
    // let alert = this.alertCtrl.create();
    // alert.setTitle('select');

    // alert.addInput({
    //   type: 'radio',
    //   label: 'Tabular View',
    //   value: 'tv',
    //   checked: true
    // },
    // );
    // alert.addInput({
    //   type: 'radio',
    //   label: 'Line Chart View',
    //   value: 'lc',
     
    // });
    //  alert.addInput({
    //    type: 'radio',
    //   label: 'Bar Graph View',
    //    value: 'bg',
     
    // });
    // alert.addButton('Cancel');
    // alert.addButton({
    //   text: 'OK',
    //   handler: data => {
    //     if (data=='tv'){
    //       var formData = new FormData();
    //       formData.append('token', this.token);
         
    //       this.navCtrl.push(TableviewPage,{check:"tv"})
    //     }
    //      else if(data=='lc'){
           
          
    //       this.navCtrl.push(DashboardPage,{check:"lc"})
    //      }
    //     else {
    //       this.navCtrl.push(BarchatPage)
    //     }
    //     this.testRadioOpen = false;
    //     this.testRadioResult = data;
    //   }
    // });
    // alert.present();
    console.log(this.token)
    
    var data={"token":this.token}
    this.rest.kpipermission(data).then(data=>{
      console.log(data)
      this.KPI=data
      this.KPI_Permission=this.KPI.data.KPI_Permission
      console.log( this.KPI_Permission)
      let alert = this.alertCtrl.create();
    alert.setTitle('select');
      for(let i=0;i<this.KPI_Permission.length;i++){

        if( this.KPI_Permission[i].customer_bar!=0){
          alert.addInput({
               type: 'radio',
              label: 'Bar Graph View',
               value: 'bg',
             
            });
        }
        if( this.KPI_Permission[i].customer_tabular!=0){
          alert.addInput({
            type: 'radio',
            label: 'Tabular View',
            value: 'tv',
            
          },
          );
        }
        if( this.KPI_Permission[i].customer_line!=0){
          
   
    alert.addInput({
      type: 'radio',
      label: 'Line Chart View',
      value: 'lc',
     
    });
        }

      }
    
      // customer_line
      // customer_tabular
      alert.addButton('Cancel');
      alert.addButton({
        text: 'OK',
        handler: data => {
          if (data=='tv'){
            var formData = new FormData();
            formData.append('token', this.token);
           
            this.navCtrl.push(TableviewPage,{check:"tv"})
          }
           else if(data=='lc'){
             
            
            this.navCtrl.push(DashboardPage,{check:"lc"})
           }
          else {
            this.navCtrl.push(BarchatPage)
          }
          this.testRadioOpen = false;
          this.testRadioResult = data;
        }
      });
      alert.present();
    });
    
  }
   
  
  
  notification(){
    this.navCtrl.push(NotificationPage)
  }
}


