import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListProductAddPageRoutingModule } from './list-product-add-routing.module';

import { ListProductAddPage } from './list-product-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListProductAddPageRoutingModule
  ],
  declarations: [ListProductAddPage]
})
export class ListProductAddPageModule {}
