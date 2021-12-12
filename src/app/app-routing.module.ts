import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ContactComponent} from "./contact/contact.component";
import {AnimalComponent} from "./animal/animal.component";
import {UploadComponent} from "./upload/upload.component";
import {HistoryComponent} from "./history/history.component";


const routes: Routes = [
  {
    path : "contact",
    component:ContactComponent
  },
  {
    path : "upload",
    component:UploadComponent
  },
  {
    path : "history",
    component:HistoryComponent
  },
  {
    path : "animal",
    component:AnimalComponent
  },
  {
    path: "",
    component:DashboardComponent
  },
  {
    path: "**",
    component:DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
