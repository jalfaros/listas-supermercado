import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(private loading: LoadingController) { }

  async presentLoading() {
    const loadin = this.loading.create({
      message: 'Please wait...'
    });

    (await loadin).present();

  }

  async dimissLoading(){
    this.loading.dismiss();
  }
}
