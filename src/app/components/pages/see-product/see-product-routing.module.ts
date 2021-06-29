import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeeProductPage } from './see-product.page';

const routes: Routes = [
  {
    path: '',
    component: SeeProductPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeeProductPageRoutingModule {}
