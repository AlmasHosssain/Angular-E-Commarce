import { CartModelServer } from './../../models/cart.model';
import { CartService } from './../../services/cart.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.css']
})
export class EndComponent implements OnInit {

  public cartTotal: number
  public cartData: CartModelServer
  constructor(private router: Router, private cartService: CartService) {
  }

  ngOnInit() {
    this.cartService.cartTotal$.subscribe((total) => {
      this.cartTotal = total
    })
    this.cartService.cartData$.subscribe((data) => {
      this.cartData = data
    })
  }

}

