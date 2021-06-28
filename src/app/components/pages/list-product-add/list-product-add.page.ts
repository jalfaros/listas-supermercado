import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MarketService } from 'src/app/services/market.service';

@Component({
  selector: 'app-list-product-add',
  templateUrl: './list-product-add.page.html',
  styleUrls: ['./list-product-add.page.scss'],
})
export class ListProductAddPage implements OnInit {

  @Input() listId : string;

  constructor( private modalAdd : ModalController,
               private _marketService : MarketService  ) { }

  ngOnInit() {
    this.getMarketList();
  }

  getMarketList(){
    this._marketService.getListMarket( this.listId ).subscribe( response => {
      console.log(response)
    })
  }


  onDimiss(){
    this.modalAdd.dismiss();
  }

}
