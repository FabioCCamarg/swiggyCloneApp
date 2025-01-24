import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { IonicModule } from '@ionic/angular';
import { LoadingRestaurantComponent } from './loading-restaurant/loading-restaurant.component';

@NgModule({
  declarations: [
    RestaurantComponent,
    LoadingRestaurantComponent
  ],
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [
    RestaurantComponent,
    LoadingRestaurantComponent
  ]
})
export class ComponentsModule { }
