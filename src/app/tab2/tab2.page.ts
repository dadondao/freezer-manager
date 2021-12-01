import { ModalController } from '@ionic/angular';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription , observable } from 'rxjs';
import { FoodService } from '../services/food.service';
import { Food } from '../interfaces/food.modal';
import { take } from 'rxjs/operators'
import { EditModal } from './edit-modal';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit, OnDestroy{
  allFoodInFreezer = [];
  sub: Subscription;
  isLoading = false;

  constructor(private foodService: FoodService , private modalController: ModalController) {}

  ngOnInit() {
    // this.allFoodInFreezer = this.foodService.allFood;
    console.log('ngOnInit', this.allFoodInFreezer );
    this.sub = this.foodService.allFood().subscribe(data => {
      this.allFoodInFreezer = data.map(e => {
        const foodItem = {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as Food
        } as Food;
        console.log('foodItem', foodItem.datePlaceInFreezer);
        return foodItem;
      })
    }, err => {})
  }
  ionViewWillEnter(){
    // this.allFoodInFreezer = this.foodService.allFood;
    console.log('ngOnInit', this.allFoodInFreezer );
  }

 async edit(id) {
    console.log('id' , id);
    const modal = await this.modalController.create({
      component: EditModal,
      componentProps: {'foodId': id}
    });
    return await modal.present()
  }

  delete(id) {
    console.log('id' , id);
    this.isLoading = true;
    this.foodService
    .deleteFood(id)
    .pipe(
      take(1),
      )
    .subscribe(data => {
      this.isLoading = false
    }, err => {
      this.isLoading = false;
      console.error(err);
    })
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}
