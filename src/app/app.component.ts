import {Component, HostBinding} from '@angular/core';
import {Router} from "@angular/router";
import {DarkModeService} from "angular-dark-mode";
import {Observable} from "rxjs";
import {NgxDarkmodeService, WidgetOptions} from "ngx-darkmode";
import {FormControl} from "@angular/forms";
import {OverlayContainer} from "@angular/cdk/overlay";

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
    }else if (localStorage.getItem("darkMode") === "off"){
      this.className = '';
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

}
