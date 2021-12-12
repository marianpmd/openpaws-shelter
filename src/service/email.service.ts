import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as http from "http";

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private baseURL:string = "http://localhost:8080"

  constructor(private http : HttpClient) { }

  sendEmail(sender:string,subject:string,message:string){
    let path = "/email/send";
    let data = {
      sender : sender,
      subject : subject,
      message : message
    }
    return this.http.post(this.baseURL+path,data);
  }
}
