import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeeProductListPageRoutingModule } from './see-product-list-routing.module';

import { SeeProductListPage } from './see-product-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeeProductListPageRoutingModule
  ],
  declarations: [SeeProductListPage]
})
export class SeeProductListPageModule {}
