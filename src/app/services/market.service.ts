import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage'

@Injectable({
  providedIn: 'root'
})
export class MarketService implements OnInit {

  constructor(private http: HttpClient,
    private storage: Storage) { }

  userInfo = {};


  async ngOnInit() {
    await this.storage.create();
  }

  BASE_URL = 'http://localhost:3000'



  async getMarkets() {
    return await this.storage.get('userInformation').then(userData =>{
      userData = JSON.parse(userData)
      return this.http.get(`${this.BASE_URL}/markets/getMarkets?uid=${userData['uid']}`)
    })
  }

  saveMarket(userInfo, data) {
    data['uid'] = userInfo['uid']
    return this.http.post(`${this.BASE_URL}/markets/newMarket`, data)
  }
}
