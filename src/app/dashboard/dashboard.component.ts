import {Component, OnInit} from '@angular/core';
import {AnimalService} from "../../service/animal.service";
import {AnimalEntity, Page} from "../datamodel/Animal";
import {debounceTime, distinctUntilChanged, map, Observable, startWith, switchMap} from "rxjs";
import {ViewportScroller} from "@angular/common";
import {Router} from "@angular/router";
import {FirebaseService} from "../../service/firebase.service";
import {FormControl} from "@angular/forms";

export interface ImgRef {
  profile: string,
  main: string
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  myControl = new FormControl();
  filteredOptions!: Observable<any>;


  public data!: AnimalEntity[];
  private pageInfo: Page | undefined;

  imgRefMap = new Map<number, ImgRef>();

  constructor(private service: AnimalService,
              private scroll: ViewportScroller,
              private router: Router,
              public firebase: FirebaseService) {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(val => {
          console.log(val)
          return this.filter(val || '')
        })
      );
  }

  // filter and return the values
  filter(val: string): Observable<any[]> {
    // call the service which makes the http-request
    return this.service.getAllAnimals()
      .pipe(
        map(response => response._embedded.animalEntities.filter(option => {
          return option.name.toLowerCase().indexOf(val.toLowerCase()) === 0
        }))
      )
  }

  ngOnInit(): void {
    this.service.getAllAnimalsPaged(0)
      .subscribe(data => {
        this.data = data._embedded.animalEntities;
        this.pageInfo = data.page;
        this.data.forEach(async value => {
          let imgRef: ImgRef = {
            profile: await this.getPictureLink(value.id, 'profile'),
            main: await this.getPictureLink(value.id, 'main'),
          }
          this.imgRefMap.set(value.id, imgRef);
        })
      });


  }


  formatAnimalType(animalType: string) {
    let string = animalType.toLowerCase();
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  onScrollDown() {
    if (this.pageInfo!.number != this.pageInfo!.totalPages) {
      console.log("CALLING");
      this.service.getAllAnimalsPaged(this.pageInfo!.number + 1)
        .subscribe(async data => {
          this.data = this.data?.concat(data._embedded.animalEntities)
          this.pageInfo = data.page;

          for (const value of data._embedded.animalEntities) {
            let imgRef: ImgRef = {
              profile: await this.getPictureLink(value.id, 'profile'),
              main: await this.getPictureLink(value.id, 'main'),
            }
            this.imgRefMap.set(value.id, imgRef);
          }
        });
    } else {
      console.log("END");
    }

  }


  onViewClick(id: number) {
    console.log("Animal id : " + id);
    this.router.navigate(["/animal"], {
      queryParams: {
        id
      }

    })
  }

  getPictureLink(id: number, type: string) {
    return this.firebase.getPicture(id, type)
      .then(data => data);
  }

  onOptionSelected(value: any) {
    console.log("Animal id : " + value.id);
    let id = value.id;
    this.router.navigate(["/animal"], {
      queryParams: {
        id
      }

    })
  }
}
