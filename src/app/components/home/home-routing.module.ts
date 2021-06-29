import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'see-produ/:id',
        loadChildren: () => import('../pages/see-product/see-product.module').then(m => m.SeeProductPageModule)
      },
      {
        path: 'see-product/:id',
        loadChildren: () => import('../pages/see-product-list/see-product-list.module').then(m => m.SeeProductListPageModule)
      },
      {
        path: 'market',
        loadChildren: () => import('../pages/market/market.module').then(m => m.MarketPageModule)
      },
      {
        path: 'product-lists/:id',
        loadChildren: () => import('../pages/product-lists/product-lists.module').then(m => m.ProductListsPageModule)
      },
      {
        path: 'products',
        loadChildren: () => import('../pages/products/products.module').then(m => m.ProductsPageModule)
      },
      {
        path: 'product-list-add',
        loadChildren: () => import('../pages/list-product-add/list-product-add.module').then(m => m.ListProductAddPageModule)
      },
      {
        path: '',
        redirectTo: 'market',
        pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule { }
