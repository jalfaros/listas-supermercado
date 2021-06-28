import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListProductAddPage } from './list-product-add.page';

const routes: Routes = [
  {
    path: '',
    component: ListProductAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListProductAddPageRoutingModule {}
