import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MarketService } from 'src/app/services/market.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-see-product',
  templateUrl: './see-product.page.html',
  styleUrls: ['./see-product.page.scss'],
})
export class SeeProductPage implements OnInit {
  argumentParam = null;

  products = [];

  constructor(
    private _router: Router,
    private _activeRoute: ActivatedRoute,
    private _serviceMarket: MarketService,
    private _toastService: ToastService
  ) { }

  ngOnInit() {
    this.argumentParam = this._activeRoute.snapshot.paramMap.get('id');
    this.getProduct();
  }

  getProduct() {
    this._serviceMarket.getProduct(this.argumentParam).subscribe(respo => {
      this.products.push(respo['data']);

    })
  }

}
