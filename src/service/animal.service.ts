import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {AnimalEntity, RootObject} from "../app/datamodel/Animal";

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  private baseURL:string = "http://localhost:8080"
  private pageSize:number = 9;
  constructor(private http:HttpClient) {

  }

  getAllAnimalsPaged(pageNum:number) :Observable<AnimalEntity[]>{
    const path = "/animalEntities?page="+pageNum+"&size="+this.pageSize;
    return this.http.get<RootObject>(this.baseURL+path)
      .pipe(
        map(data=>data._embedded.animalEntities)
      )
  }

}
