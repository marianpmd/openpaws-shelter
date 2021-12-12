import {Component, OnInit} from '@angular/core';
import {AnimalService} from "../../service/animal.service";
import {ActivatedRoute} from "@angular/router";
import {FirebaseService} from "../../service/firebase.service";
import {ImgRef} from "../dashboard/dashboard.component";
import {AnimalEntity} from "../datamodel/Animal";
import {stat} from "fs";
import {FormControl, Validators} from "@angular/forms";
import {MatSelectChange} from "@angular/material/select";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActionService} from "../../service/action.service";

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

  issuerEmail: FormControl = new FormControl('',[Validators.required , Validators.email]);
  statusType = new FormControl('', [Validators.required]);
  description: FormControl = new FormControl('',[Validators.required]);


  constructor(private service: AnimalService,
              private router: ActivatedRoute,
              private firebase: FirebaseService,
              public snackBar : MatSnackBar,
              public actionService : ActionService) {
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

  }


  getPictureLink(id: number, type: string) {
    return this.firebase.getPicture(id, type)
      .then(data => data);
  }

  clearStatus(status: string) {
    let string = status.toLowerCase().replace("_"," ");
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  onSelectionChange($event: MatSelectChange) {
    if (this.issuerEmail.invalid){
      this.snackBar.open("Please enter the issuer email!","Close", {
        duration: 3000,
        panelClass: ['mat-primary']
      });
    }else if(this.description.invalid) {
      this.snackBar.open("Please enter the description!","Close", {
        duration: 3000,
        panelClass: ['mat-primary']
      });
    }else {

      let selection = $event.value;
      if (this.animalData.status === "ADOPTED" && selection === "IN_CUSTODY"){
        console.log("CHANGED_TO_IN_CUSTODY")
        selection = "CHANGED_TO_IN_CUSTODY"
      }else if (this.animalData.status === "IN_CUSTODY" && selection === "ADOPTED") {
        selection = "CHANGED_TO_ADOPTED";
        console.log("CHANGED_TO_ADOPTED")
      }else return;

      this.actionService.insertChangeAction(selection,this.animalData.id,this.description.value,this.issuerEmail.value)
        .subscribe(data=>{
          console.log(data);
          this.snackBar.open("Status changed successfully! 😀","Close",{
            duration: 3000,
            panelClass: ['mat-primary']
          });
          this.ngOnInit();
        });
    }

  }
}
