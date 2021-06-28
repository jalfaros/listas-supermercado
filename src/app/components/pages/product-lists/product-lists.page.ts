import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MarketService } from '../../../services/market.service';
import { MarketModel } from '../../../models/Market-Model';
import { AlertController, ModalController } from '@ionic/angular';
import { ToastService } from '../../../services/toast.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ListProductAddPage } from '../list-product-add/list-product-add.page';

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
    private _toastService: ToastService,
    private _router: Router,
    private _loadingService: LoadingService,
    private modal : ModalController) {

  }

  ngOnInit() {
    this.argumentParam = this._activeRoute.snapshot.paramMap.get('id');
    this.listLoader();

  }


  listLoader() {
    this._serviceMarket.getMarket(this.argumentParam).subscribe(res => {
      if (res['success']) {
        this.market = res['data'];
        this.market.catalogues.forEach(data => {
          this.getListMarket(data);
        })

        console.log(this.market, 'market');
      }
    });

  }



  async openModalCreateList() {
    const alert = await this._alertControll.create({
      cssClass: 'my-custom-class',
      header: 'New list',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'List name'
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
              this._toastService.informationToast('Something went wrong!', 'danger', 'Error!')
            }
          })

      }
    });
  }

  getListMarket(data) {
    this._serviceMarket.getListMarket(data)
      .subscribe(resp => {
        if (resp['success']) {
          this.marketList.push(resp['data']);
        }
      })
  }

  deleteList({ listId }) {
    this._loadingService.presentLoading();
    this._serviceMarket.deleteMarketList(listId, this.argumentParam).subscribe(response => {
      if (response['data']) {
        this.filterMarketList(listId);
        this._toastService.informationToast('List deleted succesfully', 'success', 'Success!');
      } else {
        this._toastService.informationToast('Something went wrong deleting the list', 'error', 'Error!');
      }

      this._loadingService.dimissLoading();
    });
  }


  async modalAdd( listId ) {
    const modal = await this.modal.create({
      component: ListProductAddPage,
      componentProps:{
        'listId': listId
      }
    })

    return await modal.present();
  }


  addProductsList( { listId } ) {
    this.modalAdd( listId );
  }

  private filterMarketList(listId) {
    this.marketList = this.marketList.filter(item => item.listId !== listId);
  }

}
