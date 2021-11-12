import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FoodService } from '../services/food.service';
import { Food } from '../interfaces/food.modal';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit, OnDestroy{
  allFoodInFreezer = [];
  sub: Subscription;

  constructor(private foodService: FoodService) {}

  ngOnInit() {
    // this.allFoodInFreezer = this.foodService.allFood;
    console.log('ngOnInit', this.allFoodInFreezer );
    this.sub = this.foodService.allFood().subscribe(data => {
      this.allFoodInFreezer = data.map(e => {
        const foodItem = {
          id: e.payload.doc.id,
          ...e.payload.doc.data
        } as Food;
        console.log('foodItem', foodItem);
        return foodItem;
      })
    }, err => {})
  }
  ionViewWillEnter(){
    // this.allFoodInFreezer = this.foodService.allFood;
    console.log('ngOnInit', this.allFoodInFreezer );
  }
  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}
