import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ComponentdetailsPage } from '../componentdetails/componentdetails';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the ComponentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-component',
  templateUrl: 'component.html',
})
export class ComponentPage {
  public check;
  ccs: boolean = false;
  token: any;
  ch: boolean = false;
  mc: boolean = false;
  conponentcode: any;
  name: any;
  idget: any;
  equipmentget: any = [];
  equipnetall: any =[];
  sub: any;
  component_code: any;
  approval_status: any="";
  equipmentselect: any = "";
  others: any;
  select: any;
  status: any;
  tasktype: any;
  tablenew: any;
  constructor(public loadingCtrl: LoadingController, public rest: RestProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.check = this.navParams.get('check');
    this.token = JSON.parse(localStorage.getItem('menu'));
    this.tasktype = "cc";
    let loading = this.loadingCtrl.create({
      content: 'Please wait it may take few to several mins...'
    });
    loading.present();
    var formData = new FormData();
    formData.append('token', this.token);

    this.rest.site(formData).then(data => {
      this.name = data['data'].site;

    }).catch(err=>{
      alert("Service is down. Please try again later");
     
      console.log(err)
    }).then(()=>{

      this.rest.componentCode(formData).then(data => {
        this.conponentcode = data['data'].component;
        loading.dismiss();
      }).catch(err=>{
        alert("Service is down. Please try again later");
        loading.dismiss();
        console.log(err)
      })
    })



    if (this.check == 'ccs') {
      this.ccs = true;
    }
    else if (this.check == 'ch') {
      this.ch = true
    }
    else {
      this.mc = true
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ComponentPage');
  }


  componentdetails() {
    this.navCtrl.push(ComponentdetailsPage)
  }

  onChange(id) {
    this.idget = id;
    var formData = new FormData();
    formData.append('token', this.token);
    formData.append('id', id)
    this.rest.equtment(formData).then(datsat => {
      this.sub = datsat['data'].equipment;
    }).then(()=>{
      console.log(this.sub)
    })
  }
  details() {

    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
    });

    loading.present();

    var formData = new FormData();
    formData.append('token', this.token);
    // formData.append('status', JSON.stringify(this.status));
    formData.append("site_id", this.idget);

    if (this.equipnetall) {
      formData.append('eqp_plan_id', JSON.stringify(this.equipnetall));
    }
    else {
      formData.append('eqp_plan_id', this.equipnetall)
    }


    if (this.check == 'mjc') {

      if (this.component_code) {
        formData.append('comp_code_id', JSON.stringify(this.component_code));
      }
      else {
        formData.append('comp_code_id', this.component_code );

      }

      if (this.approval_status) {
        formData.append("approval_status", JSON.stringify(this.approval_status))
      }
      else {
        formData.append("approval_status", this.approval_status)
      }


      this.rest.majorComponenet(formData).then(data => {
         console.log(data['count']);
         if(data['count']==0){
          alert("No data found")
          loading.dismiss();
         }
         else{
          this.navCtrl.push(ComponentdetailsPage, { "selecttable": data['data'].event_notification, "flag": 'major' })
          loading.dismiss();
         }
        
        // this.navCtrl.push(ComponentdetailsPage, { "selecttable": data['data'].event_notification, "flag": 'major' })
       
      }).catch(err=>{
        alert("Service is down. Please try again later");
        loading.dismiss();
        console.log(err)
      })

    }
    else {

      this.rest.progresscompt(formData).then(data => {
        console.log(data);
        this.navCtrl.push(ComponentdetailsPage, { "selecttable": data['data'].event_notification })
      }).catch(err=>{
        alert("Service is down. Please try again later");
        loading.dismiss();
        console.log(err)
      })
    }
     console.log("okdis")

  }
  onConponentSelect(item){
    console.log(item)
  }
  onset(){
    
  }
  dashboad() {
 
    let loading = this.loadingCtrl.create({
      content: 'Please wait it may take few to several mins...'
    });
    loading.present();

    var formData = new FormData();

    formData.append('token', this.token);
    formData.append('site_id', this.idget);

    // comp_code_id

    if (this.equipnetall) {
      console.log(this.equipnetall)
      formData.append('eqp_plan_id', JSON.stringify(this.equipnetall));
    }
    else {
      formData.append('eqp_plan_id', this.equipnetall = null);
    }
    
    if (this.component_code) {
      formData.append('comp_code_id', JSON.stringify(this.component_code));
    }
    else {
      formData.append('comp_code_id', this.component_code = null);
    }

    this.rest.dashbordData(formData).then(data => {
      // console.log(data.count: 0)
      if(data['count']==" 0"){
        alert("No data found")
        loading.dismiss();
      }
      else{
        this.tablenew = data['data'].component_life_cycle;
        loading.dismiss();
      }
  
    }).catch(err=>{
      alert("Service is down. Please try again later");
      loading.dismiss();
      console.log(err)
    })
    // .then(()=>{
    //   this.conponentcode=null;
    //   this.equipnetall=null;
    // })

  }

  public getObjectKey(index) {

    return Object.keys(index);
  }

  dashboadHistory() {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',

    });

    loading.present();


    var formData = new FormData();

    formData.append('token', this.token);
    formData.append('site_id', this.idget);
    if (this.equipnetall) {
      formData.append('eqp_plan_id', JSON.stringify(this.equipnetall));
    }
    else {
      formData.append('eqp_plan_id', this.equipnetall = null);
    }

    if (this.component_code) {
      formData.append('comp_code_id', JSON.stringify(this.component_code));
    }
    else {
      formData.append('comp_code_id', this.component_code = null);

    }
    this.rest.dashbordHistory(formData).then(data => {
      this.tablenew = data['data'].component_history;
      loading.dismiss();
    }).catch(err=>{
      alert("Service is down. Please try again later");
     
      console.log(err)
    })

  }
}
