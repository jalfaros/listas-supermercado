import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddProductModalPage } from './add-product-modal/add-product-modal.page'

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  constructor( private modalController : ModalController ) { }

  ngOnInit() {
  }



  async onAdd(){
    const modal = await this.modalController.create({
      component: AddProductModalPage
    });

    return await modal.present();
  }


}
