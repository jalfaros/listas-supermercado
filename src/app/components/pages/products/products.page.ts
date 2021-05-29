import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProductsService } from 'src/app/services/products.service';
import { ToastService } from 'src/app/services/toast.service';
import { AddProductModalPage } from './add-product-modal/add-product-modal.page'

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  products = []

  constructor(private modalController: ModalController,
    private _productService: ProductsService,
    private toast: ToastService) { }

  ngOnInit() {
    this.onGetProducts();
  }



  async onAdd() {
    const modal = await this.modalController.create({
      component: AddProductModalPage
    });

    modal.onDidDismiss().then(data => {
      if (!data['data']) {
        return;
      }

      this.onSaveProduct(data['data']);

    })
    return await modal.present();
  }


  onSaveProduct(productData) {
    this._productService.onNewProduct(productData).subscribe(response => {
      if (response['success']) {
        this.onGetProducts()
      } 
    });
  }

  onGetProducts() {
    this._productService.onGetProducts().subscribe((response: any) => {
      this.products = response['productsList'];
      console.log(this.products, 'Holi')
    });
  }


}
