import { CartService } from './../../services/cart.service';
import { ProductModel } from './../../models/product.model';
import { Router } from '@angular/router';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: ProductModel[] = []
  constructor(private productService: ProductService,
    private router: Router,
    private cartService: CartService) { }

  ngOnInit() {
    this.productService.getAllProducts()
      .subscribe((prods: ProductModel[]) => {
        this.products = prods
        console.log(prods)
      })
  }

  selectedProduct(_id) {
    this.router.navigate(['product', _id])
  }

  AddToCart(_id: string) {
    this.cartService.AddProductToCart(_id)
    //console.log('Ki')
  }

}
