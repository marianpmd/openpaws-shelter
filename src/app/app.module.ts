import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import { ContactComponent } from './contact/contact.component';
import {MatCardModule} from "@angular/material/card";
import {HttpClientModule} from "@angular/common/http";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {environment} from "../environments/environment";
import { AnimalComponent } from './animal/animal.component';
import { UploadComponent } from './upload/upload.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatRadioModule} from "@angular/material/radio";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import { CommonModule } from '@angular/common';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import {MatTableModule} from "@angular/material/table";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import { DARK_MODE_OPTIONS } from 'angular-dark-mode';
import {NgxDarkmodeModule} from "ngx-darkmode";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { HistoryComponent } from './history/history.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ContactComponent,
    AnimalComponent,
    UploadComponent,
    HistoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    HttpClientModule,
    InfiniteScrollModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
    IvyCarouselModule,
    MatTableModule,
    MatTooltipModule,
    MatAutocompleteModule,
    NgxDarkmodeModule,
    MatSlideToggleModule,
    MatSnackBarModule
  ],
  providers: [
    {
      provide: DARK_MODE_OPTIONS,
      useValue: {
        element:document.body
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
