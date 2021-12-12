import { Component, OnInit } from '@angular/core';
import {Router, Routes} from "@angular/router";
import {Form, FormControl, FormGroup, Validators} from "@angular/forms";
import {EmailService} from "../../service/email.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {



  subject: FormControl = new FormControl('', [Validators.required]);
  message: FormControl = new FormControl('', [Validators.required]);
  senderEmail: FormControl = new FormControl('',[Validators.required , Validators.email]);
  formGroup : FormGroup = new FormGroup({
      subject:this.subject,
      message:this.message
  });

  constructor(private router:Router,
              private service : EmailService,
              public snackBar : MatSnackBar) { }

  ngOnInit(): void {

  }


  onSubmit() {
    this.service.sendEmail(this.senderEmail.value , this.subject.value , this.message.value)
      .subscribe(data=>{
        console.log("From ems");
        console.log(data);
        this.snackBar.open('The email has been sent 📬', 'Close', {
          duration: 3000,
          panelClass: ['mat-primary']
        });
      })
  }
}
