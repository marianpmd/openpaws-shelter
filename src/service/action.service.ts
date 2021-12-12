import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as http from "http";
import {Observable} from "rxjs";
import {ActionEntity, RootObject} from "../app/datamodel/Animal";

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  private baseURL:string = "http://localhost:8080";

  constructor(private http : HttpClient) { }

  getAll() : Observable<ActionEntity[]>{
    return this.http.get<ActionEntity[]>(this.baseURL+"/actions/actionEntities");
  }

  insertChangeAction(actionType: string, animalId: number, description: string, issuerEmail: string){
    let data = {
      actionType : actionType,
      animalId : animalId,
      description : description,
      issuerEmail : issuerEmail
    }

    return this.http.post(this.baseURL + "/actions/new",data);
  }
}
