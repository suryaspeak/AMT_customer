import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { EventPage } from '../pages/event/event';
import { FeedbackPage } from '../pages/feedback/feedback';
import { DetailsPage } from '../pages/details/details';
import { AlldetailsPage } from '../pages/alldetails/alldetails';
import { PopoverPage } from '../pages/popover/popover';
import {ResourceTree } from '../components/resourcetree/resourcetree';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LogoutPage } from '../pages/logout/logout';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { HistoryPage } from '../pages/history/history';
import { ProfilePage } from '../pages/profile/profile';
import { AssetsdetilsPage } from '../pages/assetsdetils/assetsdetils';
import { ComponentPage } from '../pages/component/component';
import { EventdetailsPage } from '../pages/eventdetails/eventdetails';
import { ComponentdetailsPage } from '../pages/componentdetails/componentdetails';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { RestProvider } from '../providers/rest/rest';
import { BreakPage } from '../pages/break/break';
import {  ViewassetsPage } from '../pages/viewassets/viewassets';
import { Ionic2RatingModule } from 'ionic2-rating';
import {  BarchatPage } from '../pages/barchat/barchat';
import {  ComponentalldetilsPage } from '../pages/componentalldetils/componentalldetils';
import {  YettostartlistPage } from '../pages/yettostartlist/yettostartlist';
import {  YettostartlistdetilsPage } from '../pages/yettostartlistdetils/yettostartlistdetils';
import {  BarchatsixPage } from '../pages/barchatsix/barchatsix';
import { HttpClientModule } from '@angular/common/http';
import { TableviewPage } from '../pages/tableview/tableview';
import { FilterChartPage } from '../pages/filter-chart/filter-chart';
import { BarresultPage } from '../pages/barresult/barresult';
import { NotificationPage } from '../pages/notification/notification';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    FeedbackPage,
    ComponentdetailsPage,
    LoginPage,
    BarchatPage,
    DetailsPage,
    DashboardPage,
    LogoutPage,
    HistoryPage,
    ProfilePage,
    NotificationPage,
    BarresultPage,
    BreakPage,
    ViewassetsPage,
    ComponentalldetilsPage,
    EventPage,
    EventdetailsPage,
    ResourceTree,
    FilterChartPage,
    AssetsdetilsPage,
    TableviewPage,
    PopoverPage,
    BarchatsixPage,
    ComponentPage,
    AlldetailsPage,
    YettostartlistPage,YettostartlistdetilsPage
   
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    Ionic2RatingModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    DetailsPage,
    TableviewPage,
    LogoutPage,
    EventPage,
    DashboardPage,
    PopoverPage,
    FilterChartPage,
    BarresultPage,
    NotificationPage,
    BarchatsixPage,
    FeedbackPage,
    HistoryPage,
    ProfilePage,
    BreakPage,
    ComponentalldetilsPage,
    BarchatPage,
    YettostartlistPage,YettostartlistdetilsPage,
    
    ViewassetsPage,
    AssetsdetilsPage,
    AlldetailsPage,
    ComponentPage,
    EventdetailsPage,
    ComponentdetailsPage,
    ResourceTree
   
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider,
    ScreenOrientation
  ]
})
export class AppModule {}
