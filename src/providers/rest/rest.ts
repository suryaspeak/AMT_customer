import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
  url='http://mamt.gainwellindia.com/gainwell-amt/api/';
  // url=' https://nexgenams.gainwellindia.com/gainwell-amt/api/';
 
  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }
  logindata(data)  
  {
    return new Promise((resolve, reject) => {
      this.http.post(this.url+'login',data)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }


  useraccess(data){
    return new Promise((resolve, reject) => {
      this.http.post(this.url+'user',data)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  site(data){
    return new Promise((resolve, reject) => {
      this.http.post(this.url+'site',data)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  slider(data){
    return new Promise((resolve, reject) => {
      this.http.post(this.url+'slider',data)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  ewtbs(data){
    return new Promise((resolve, reject) => {
      this.http.post(this.url+'view-asset-status',data)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  equtment(data){
    return new Promise((resolve, reject) => {
      this.http.post(this.url+'equipment-by-site',data)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
 event(data){
  return new Promise((resolve, reject) => {
    this.http.post(this.url+'default-event-creation',data)
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
  
  
 }
 feedback(data){
  return new Promise((resolve, reject) => {
    this.http.post(this.url+'feedback-question',data)
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
  
  
 }
 viewasset(data){  
  return new Promise((resolve, reject) => {
    this.http.post(this.url+'view-asset-details',data)
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
 }

 feedbackans(data){  
  return new Promise((resolve, reject) => {
    this.http.post(this.url+'feedback-answer',data)
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
 }

 progresscompt(data){
  return new Promise((resolve, reject) => {
    this.http.post(this.url+'view-events-in_progress-or-completed',data)
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}

eventStatus(data){
  return new Promise((resolve, reject) => {
    this.http.post(this.url+'event-status',data)
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}

locationBySite(data){
  return new Promise((resolve, reject) => {
    this.http.post(this.url+'equipment-location',data)
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}

componentCode(data){
  return new Promise((resolve, reject) => {
    this.http.post(this.url+'component-codes',data)
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}



eventDeatils(data){
  return new Promise((resolve, reject) => {
    this.http.post(this.url+'view-events-details',data)
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}

majorComponenet(data){
  return new Promise((resolve, reject) => {
    this.http.post(this.url+'view-events-for-Major-Components',data)
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}
majorComponenetDetils(data){
  return new Promise((resolve, reject) => {
    this.http.post(this.url+'view-events-for-Major-Component-Details',data)
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}
updateStatus(data){
  return new Promise((resolve, reject) => {
    this.http.post(this.url+'update-events-approval-status-for-MajComp',data)
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}
dashbordData(data){
  return new Promise((resolve, reject) => {
    this.http.post(this.url+'component-dashboard',data)
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}
dashbordHistory(data){
  return new Promise((resolve, reject) => {
    this.http.post(this.url+'component-history',data)
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}

viewEventYTS(data){
  return new Promise((resolve, reject) => {
    this.http.post(this.url+'view-events-in-YTS',data)
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}
fleetbysite(data){
  return new Promise((resolve, reject) => {
    this.http.post(this.url+'fleet-by-site',data)
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}

table(data){
  return new Promise((resolve, reject) => {
    this.http.post(this.url+'kpiDashboard',data)
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}

kpiDashboardBar6View(data){
  return new Promise((resolve, reject) => {
    this.http.post(this.url+'kpiDashboardBar6View',data)
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}
barChartThreeMonths(data){
  return new Promise((resolve, reject) => {
    this.http.post(this.url+'kpiDashboardBar3View',data)
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}
kpiDashboardLineCurrentMonthView(data){
  return new Promise((resolve, reject) => {
    this.http.post(this.url+'kpiDashboardLineCurrentMonthView',data)
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}
kpiDashboardLineLastMonthView(data){
  return new Promise((resolve, reject) => {
    this.http.post(this.url+'kpiDashboardLineLastMonthView',data)
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}

NotificationCount(data){
  return new Promise((resolve, reject) => {
    this.http.post(this.url+'notificationCount',data)
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}
Notiflist(data){
  return new Promise((resolve, reject) => {
    this.http.post(this.url+'notification',data)
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}
// new
kpipermission(data){
  return new Promise((resolve, reject) => {
    this.http.post(this.url+'kpi-permission',data)
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  })
}
feedbackpermission(data){
  return new Promise((resolve, reject) => {
    this.http.post(this.url+'feedback-By-CustomerId',data)
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  })
}
userlog (data){
  return new Promise((resolve, reject) => {
    this.http.post(this.url+'user-log ',data)
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  })
}
notificationSeen(data){
  return new Promise((resolve, reject) => {
    this.http.post(this.url+'notificationSeen',data)
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}
}
