import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {AnimalService} from "../../service/animal.service";
import {AnimalEntity} from "../datamodel/Animal";
import {Observable} from "rxjs";
import {Content} from "@angular/compiler/src/render3/r3_ast";
import {ViewportScroller} from "@angular/common";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public data: AnimalEntity[] | undefined;

  constructor(private service:AnimalService,
              private scroll:ViewportScroller) { }

  ngOnInit(): void {
     this.service.getAllAnimalsPaged(0)
       .subscribe(data=>this.data = data);
  }

  formatAnimalType(animalType: string) {
    let string = animalType.toLowerCase();
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  onScrollDown() {
    console.log("asdsdadsadasd")
    this.service.getAllAnimalsPaged(1)
      .subscribe(data=>this.data = this.data?.concat(data));
  }

  scrollToTop() {
    this.scroll.scrollToPosition([0,0]);
  }
}
