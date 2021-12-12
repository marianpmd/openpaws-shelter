import {Component, HostBinding} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DarkModeService} from "angular-dark-mode";
import {Observable} from "rxjs";
import {NgxDarkmodeService, WidgetOptions} from "ngx-darkmode";
import {FormControl} from "@angular/forms";
import {OverlayContainer} from "@angular/cdk/overlay";
import * as path from "path";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'piug-frontend';
  tooltip: string = "Click on 'view' for one of the animals to check them out!";
  @HostBinding('class') className = '';

  toggleControl = new FormControl(false);

  constructor(private router: Router,
              public darkModeService:DarkModeService,
              private overlay: OverlayContainer) {
    console.log(router.url);
  }
  ngOnInit(): void {
    if(localStorage.getItem("darkMode") === null){
        localStorage.setItem('darkMode',"off");
      }

    if (localStorage.getItem("darkMode") === "on"){
      this.toggleControl.setValue(!this.toggleControl.value);
      this.className = 'darkMode';
      this.overlay.getContainerElement().classList.add(this.className);
    }else if (localStorage.getItem("darkMode") === "off"){
      this.className = '';
      this.overlay.getContainerElement().classList.remove('darkMode');
    }
    this.toggleControl.valueChanges.subscribe((darkMode) => {
      const darkClassName = 'darkMode';

      this.className = darkMode ? darkClassName : '';
      if (darkMode) {
        localStorage.setItem("darkMode","on");
        this.overlay.getContainerElement().classList.add(darkClassName);
      } else {
        localStorage.setItem("darkMode","off");
        this.overlay.getContainerElement().classList.remove(darkClassName);
      }
    });
  }

  getTooltipByPath() {
    let url = this.router.url;
    if (url.includes("?")){
      url = url.slice(0, url.indexOf("?"));
    }

    switch (url) {
      case "/" : return 'Click on "View" to see more details about an animal!';
      case "/dashboard" : return "Click on view to see more details about an animal!";
      case "/upload" : return "Insert all the data from the form and pictures first to upload a new animal.";
      case "/contact" : return "Send us an email by completing the from below.";
      case "/animal" : return "Check the details about this pet, and change his adopted status.";
      case "/history" : return "Here you can check other actions that have been taken.";

    }
    return "UNKNOWN PATH";
  }
}
