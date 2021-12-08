import {Component, OnInit} from '@angular/core';
import {AnimalService} from "../../service/animal.service";
import {ActivatedRoute} from "@angular/router";
import {FirebaseService} from "../../service/firebase.service";
import {ImgRef} from "../dashboard/dashboard.component";
import {AnimalEntity} from "../datamodel/Animal";

interface ImgRefFull extends ImgRef {
  additional: string;
}

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.scss']
})
export class AnimalComponent implements OnInit {
  public animalId!: number;

  public profile!:string;
  public main!:string;
  public additional!:string;

  public animalData!:AnimalEntity;

  /*imgRefMap = new Map<number, ImgRefFull>();*/

  constructor(private service: AnimalService,
              private router: ActivatedRoute,
              private firebase: FirebaseService) {
  }

  ngOnInit(): void {
    this.router.queryParams.subscribe(params => {
      this.animalId = params['id'];
      if (this.animalId != undefined) {
        this.service.getAnimalById(this.animalId)
          .subscribe(async data => {
            console.log(data);
            this.animalData = data;

            this.profile = await  this.getPictureLink(this.animalId,'profile');
            this.main = await  this.getPictureLink(this.animalId,'main');
            this.additional = await  this.getPictureLink(this.animalId,'additional');

          })
      }
    })

    /*this.firebaseService.getPictures();*/
  }

  getPictureLink(id: number, type: string) {
    return this.firebase.getPicture(id, type)
      .then(data => data);
  }
}
