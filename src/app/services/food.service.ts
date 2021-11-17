
import { Injectable } from '@angular/core';
import { Food } from '../interfaces/food.modal';

import { DocumentChangeAction, AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FoodService {
  // private _allFood: Food[] = [];

  // get allFood() {
  //   return this._allFood;
  // }
  constructor(private afs: AngularFirestore){}
  allFood(){
    return this.afs.collection('freezer').snapshotChanges();
  };

  addFood(foodItem: Food): Promise<DocumentReference>{
    return this.afs.collection('freezer').add(foodItem);
  }
  deleteFood(id: String): Observable<any> {
    return from(this.afs.doc('freezer/${id}').delete());

  }

}
