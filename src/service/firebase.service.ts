import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireStorage, AngularFireStorageReference} from "@angular/fire/compat/storage";


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  imgRef!:string;


  constructor(private store: AngularFireStorage) {
  }

  getPicture(id:number,imageType:string) {
     return  this.store.storage.ref("/"+id+"/"+imageType).getDownloadURL();
  }
}
