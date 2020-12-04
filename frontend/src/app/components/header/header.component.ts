import { CartService } from './../../services/cart.service';
import { CartModelServer } from './../../models/cart.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

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

}
