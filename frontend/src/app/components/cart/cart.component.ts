import { CartModelServer } from './../../models/cart.model';
import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public cartData: CartModelServer
  public cartTotal: number
  constructor(public cartService: CartService) { }

  ngOnInit() {
    this.cartService.cartTotal$.subscribe((total) => {
      this.cartTotal = total
    })
    this.cartService.cartData$.subscribe((data) => {
      this.cartData = data
    })
  }
  changeProductNUmber(i: number, quantityStatus: boolean) {
    this.cartService.UpdateCartData(i, quantityStatus)
  }

}
