import {Component, OnInit} from '@angular/core';
import {FirebaseService} from "../../service/firebase.service";
import {Observable} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AnimalService} from "../../service/animal.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  selectedFile: File | null | undefined;
  downloadURL: Observable<string> | undefined;

  name = new FormControl('', [Validators.required]);
  animalType = new FormControl('', [Validators.required]);
  age = new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]);
  description = new FormControl('', [Validators.required]);

  formGroup: FormGroup = new FormGroup({
    name: this.name,
    animalType: this.animalType,
    age: this.age,
    description: this.description
  });

  profilePic!: File;
  mainPic!: File;
  additionalPic!: File;

  uploadState: boolean = false;

  constructor(private firebase: FirebaseService,
              private ref: AngularFireStorage,
              private service: AnimalService,
              private router: Router,
              public snackBar : MatSnackBar) {
  }

  ngOnInit(): void {
  }


  uploadFileByType(file: File, animalId: number, pictureType: string) {
    console.log(file.name);
    this.ref.upload(animalId + "/" + pictureType, file);
  }


  fileChange($event: any, fileReference: string) {
    const target = $event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];

    switch (fileReference) {
      case "profile":
        this.profilePic = file;
        console.log("Profile pic : " + this.profilePic.name);
        console.log("state : " + this.uploadState);
        break;
      case "main":
        this.mainPic = file;
        console.log("Main pic : " + this.mainPic.name);
        console.log("state : " + this.uploadState);
        break;
      case "additional":
        this.additionalPic = file;
        console.log("Additional pic : " + this.additionalPic.name);
        console.log("state : " + this.uploadState);
        break;
    }

    if (this.profilePic != null && this.mainPic != null && this.additionalPic != null) {
      this.uploadState = true
      console.log("State set to true")
    }
  }

  upload() {
    let animal = {
      name: this.name.value,
      animalType: this.animalType.value,
      age: this.age.value,
      description: this.description.value
    }

    console.table(animal);

    this.service.uploadAnimal(animal)
      .subscribe({
        next: value => {
          console.log("adadadsadadasd")
          console.log(value.id)
          this.uploadFileByType(this.profilePic, value.id, "profile")
          this.uploadFileByType(this.mainPic, value.id, "main")
          this.uploadFileByType(this.additionalPic, value.id, "additional")
          this.router.navigate(["/dashboard"]);
        },
        error: err => alert("Invalid parameters!")
      })


  }
}
