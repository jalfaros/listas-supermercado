import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MarketService } from 'src/app/services/market.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-see-product-list',
  templateUrl: './see-product-list.page.html',
  styleUrls: ['./see-product-list.page.scss'],
})
export class SeeProductListPage implements OnInit {

  argumentParam = null;
  nameList = '';
  productsList = [];
  products = [];

  constructor(
    private _router: Router,
    private _activeRoute: ActivatedRoute,
    private _serviceMarket: MarketService,
    private _toastService: ToastService
  ) { }

  ngOnInit() {
    this.argumentParam = this._activeRoute.snapshot.paramMap.get('id');
    this.getList();
  }

  getList() {
    this.products = [];
    this.productsList = [];

    this._serviceMarket.getListMarket(this.argumentParam)
      .subscribe(resp => {

        if (resp['success']) {
          this.nameList = resp['data'].listMarketName;
          this.productsList = resp['data'].products;

          this.productsList.forEach(data => {
            this._serviceMarket.getProduct(data).subscribe(respo => {
              this.products.push(respo['data']);
              console.log('el producto', respo);

            })
          })
        }
        console.log('la response', this.productsList);

      })
  }

  async deleteProductList(idProduct) {
    await this._serviceMarket.deleteProductList(this.argumentParam, this.productsList[idProduct]).subscribe(resp => {
      if (resp['success']) {
        this._toastService.informationToast('List deleted succesfully', 'success', 'Success!');
        this.products.splice(idProduct, 1);


      } else {
        this._toastService.informationToast('Something went wrong deleting the list', 'error', 'Error!');
      }
    });

  }

  seeProdu(listId) {
    this._router.navigate(['/home/see-produ', this.productsList[listId]]);
  }




}
