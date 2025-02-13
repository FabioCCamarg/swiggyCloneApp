import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: false,
})
export class CartPage implements OnInit {
  urlCheck: any;
  url: any;
  model: any ={};
  deliveryCharge = 20;
  instruction: any;

  constructor(private router: Router) {}

  ngOnInit() {
    this.checkUrl();
    this.getmodel();
  }

  getCart() {
    return Preferences.get({key: 'cart'});
  }

  async getmodel() {
    let data: any = await this.getCart();
    if(data?.value) {
      this.model = await JSON.parse(data.value);
      console.log(this.model);
      this.calculate();
    }
  }
  async calculate() {
    let item = this.model.items.filter(x => x.quantity > 0);
    this.model.items = item;
    this.model.totalPrice = 0;
    this.model.totalItem = 0;
    this.model.deliveryCharge = 0;
    this.model.grandTotal = 0;
    item.forEach(element => {
      this.model.totalItem += element.quantity;
      this.model.totalPrice += (parseFloat(element.price) * parseFloat(element.quantity));
    });
    this.model.deliveryCharge = this.deliveryCharge;
    this.model.totalPrice = parseFloat(this.model.totalPrice).toFixed(2);
    this.model.grandTotal = (parseFloat(this.model.totalPrice) + parseFloat(this.model.deliveryCharge)).toFixed(2);
    if(this.model.totalItem == 0) {
      this.model.totalItem = 0;
      this.model.totalPrice = 0;
      this.model.grandTotal = 0;
      await this.clearCart();
      this.model = null;
    }
    console.log('cart: ', this.model);
  }

  clearCart() {
    Preferences.remove({key: 'cart'});
  }

  checkUrl() {
    let url: any = this.router.url.split('/');
    console.log('url', url);
    const spliced = url.splice(url.length - 2, 2);
    this.urlCheck = spliced[0];
    console.log('urlCheck: ', this.urlCheck);
    url.push(this.urlCheck);
    this.url = url;
  }

  getPreviousUrl() {
    return this.url.join('/');
  }

  quantityPlus(index) {

  }

  quantityMinus(index) {

  }

  addAddress() {

  }

  changeAddress() {

  }

  makePayment() {
    console.log('make payment');
  }
}
