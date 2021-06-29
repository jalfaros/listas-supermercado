import { Component, ComponentFactoryResolver, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoadingService } from 'src/app/services/loading.service';
import { MarketService } from 'src/app/services/market.service';
import { ProductsService } from 'src/app/services/products.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-list-product-add',
  templateUrl: './list-product-add.page.html',
  styleUrls: ['./list-product-add.page.scss'],
})
export class ListProductAddPage implements OnInit {

  @Input() listId: string;

  listData;
  productsList = []

  selectedProducts = []

  constructor(private modalAdd: ModalController,
    private _marketService: MarketService,
    private _productsService: ProductsService,
    private _toastService: ToastService,
    private _loading : LoadingService,) { }

  async ngOnInit() {
    await this.getMarketList();
    await this.onGetProducts();
  }

  async getMarketList() {
    this._marketService.getListMarket(this.listId).subscribe(async (response) => {
      this.listData = await response['data'];
    });
  };

  async onGetProducts() {
    (await this._productsService.onGetProducts()).subscribe(response => {
      if (response['success']) {
        this.productsList = response['productsList'];
      } else {
        this._toastService.informationToast('Something went wrong loading the products', 'danger', 'Error!');
      }
    })
  }


  onChange(event, product) {
    const { detail } = event;
    const { productId } = product;
    if (detail.checked) {
      this.selectedProducts.push(productId);
    } else {
      this.selectedProducts = this.selectedProducts.filter(item => item !== productId);
    }

    console.log(this.selectedProducts);
  }

  onAddProducts() {
    if (this.selectedProducts.length === 0) {
      this._toastService.informationToast('You must select at least one product', 'warning', 'Ooops!');
      return;
    };

   

    this._productsService.onAddProductToList(this.listId, this.selectedProducts).subscribe(response => {
      if (response['success']) {    
        this._toastService.informationToast('Products added succesfully', 'success', 'Cool!');
        this.modalAdd.dismiss();
      }else{
        this._toastService.informationToast('Something went wrong adding the products', 'danger', 'Error!');
      }
    });


  }


  onDimiss() {
    this.modalAdd.dismiss();
  }

}
