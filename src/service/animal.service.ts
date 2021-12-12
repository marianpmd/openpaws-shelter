import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {AnimalEntity, RootObject} from "../app/datamodel/Animal";
import * as http from "http";

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  private baseURL:string = "http://localhost:8080"
  private pageSize:number = 2;
  constructor(private http:HttpClient) {

  }

  getAllAnimalsPaged(pageNum:number) :Observable<RootObject>{
    const path = "/animalEntities?page="+pageNum+"&size="+this.pageSize;
    return this.http.get<RootObject>(this.baseURL+path);

  }
  getAllAnimals(){
    const path = "/animalEntities";
    return this.http.get<RootObject>(this.baseURL+path);
  }

  getAnimalById(animalId: number) {
    const path = "/animalEntities/id?id="+animalId;
    return this.http.get<AnimalEntity>(this.baseURL+path);
  }

  uploadAnimal(animal: { name: string; animalType: string; description: string; age: number }) {
    const path = "/animalEntities";
    console.log("inside service");
    console.table(animal)

    const headers = { 'content-type': 'application/json'}

    return this.http.post<AnimalEntity>(this.baseURL+path,animal,{headers});
  }
}
