import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarketService } from '../../../services/market.service';
import { MarketModel } from '../../../models/Market-Model';

@Component({
  selector: 'app-product-lists',
  templateUrl: './product-lists.page.html',
  styleUrls: ['./product-lists.page.scss'],
})
export class ProductListsPage implements OnInit {


  argumentParam = null;
  market: MarketModel = new MarketModel;


  constructor(
    private _activeRoute: ActivatedRoute,
    private _serviceMarket: MarketService) { }

  ngOnInit() {
    this.argumentParam = this._activeRoute.snapshot.paramMap.get('id');

    this._serviceMarket.getMarket(this.argumentParam).subscribe(res => {

      if (res['success']) {
        this.market = res['data'];
        console.log(this.market, 'market');
      }

    })

  }

}
