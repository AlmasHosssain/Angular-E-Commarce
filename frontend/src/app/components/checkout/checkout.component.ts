import { CartModelServer } from './../../models/cart.model';
import { Router } from '@angular/router';
import { OrderService } from './../../services/order.service';
import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  public cartTotal: number
  public cartData: CartModelServer

  constructor(private cartService: CartService,
    private orderService: OrderService,
    private router: Router) { }


  ngOnInit() {
    this.cartService.cartTotal$.subscribe((total) => {
      this.cartTotal = total
    })
    this.cartService.cartData$.subscribe((data) => {
      this.cartData = data
    })
  }

  checkOut = () => {
    this.cartService.CheckOutFromCart('5ef3a60cf1dff8432871c131')
  }

}
