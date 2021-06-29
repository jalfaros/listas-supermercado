import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeeProductListPage } from './see-product-list.page';

const routes: Routes = [
  {
    path: '',
    component: SeeProductListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeeProductListPageRoutingModule {}
