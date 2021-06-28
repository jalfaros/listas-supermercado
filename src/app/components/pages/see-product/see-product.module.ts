import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeeProductPageRoutingModule } from './see-product-routing.module';

import { SeeProductPage } from './see-product.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeeProductPageRoutingModule
  ],
  declarations: [SeeProductPage]
})
export class SeeProductPageModule {}
