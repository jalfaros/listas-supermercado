import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarketService } from '../../../services/market.service';
import { MarketModel } from '../../../models/Market-Model';
import { AlertController } from '@ionic/angular';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-product-lists',
  templateUrl: './product-lists.page.html',
  styleUrls: ['./product-lists.page.scss'],
})
export class ProductListsPage implements OnInit {


  argumentParam = null;
  market: MarketModel = new MarketModel;
  marketList = [];


  constructor(
    private _activeRoute: ActivatedRoute,
    private _serviceMarket: MarketService,
    private _alertControll: AlertController,
    private _toastService: ToastService) {

  }

  ngOnInit() {
    this.argumentParam = this._activeRoute.snapshot.paramMap.get('id');

    this._serviceMarket.getMarket(this.argumentParam).subscribe(res => {

      if (res['success']) {
        this.market = res['data'];
        this.market.catalogues.forEach(data => {
          this.getListMarket(data);
        })

        console.log(this.market, 'market');
      }

    })
  }

  async openModalCreateList() {
    const alert = await this._alertControll.create({
      cssClass: 'my-custom-class',
      header: 'Creating list',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Name of list'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Add',
          handler: ({ name }) => {
            if (name.length < 1) {
              this._toastService.informationToast('The name can not be empty', 'danger', 'Error!');
              return;
            }

            this.saveListProduct({ listProductsName: name });

          }
        }
      ]
    });

    await alert.present();
  }

  saveListProduct(data) {
    this._serviceMarket.createListMarket(data).subscribe(resp => {
      if (resp['success']) {
        this._serviceMarket.addIdListToMarket({ idList: resp['idListProduct'], idMarket: this.argumentParam })
          .subscribe(respo => {
            if (respo['success']) {
              this.getListMarket(resp['idListProduct']);
              this._toastService.informationToast('Market added succesfully', 'success', 'Success!');
            } else {
              this._toastService.informationToast('Danger', 'Error', 'Error')
            }
          })

      }
    });
  }

  getListMarket(data) {
    this._serviceMarket.getListMarket(data)
      .subscribe(resp => {
        if (resp['success']) {
          console.log('la data ', resp);
          this.marketList.push(resp['data']);
        }
      })
  }

}
