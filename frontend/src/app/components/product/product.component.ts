import { CartService } from './../../services/cart.service';
import { ProductService } from './../../services/product.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';


declare let $: any
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, AfterViewInit {

  _id: string;
  product;
  otherImg: any[] = []

  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let tempId = params.get('_id')
      this._id = tempId
      this.productService.getSingleProduct(this._id)
        .subscribe((prod) => {
          this.product = prod
          if (prod.images !== "") {
            this.otherImg = prod.images.split(';');
          }
        })

    })
  }

  AddToCart(_id: string, inputValue) {
    let sendValue = parseInt(inputValue.value)
    this.cartService.AddProductToCart(_id, sendValue)
  }

  ngAfterViewInit() {
    // Product Main img Slick
    $('#product-main-img').slick({
      infinite: true,
      speed: 300,
      dots: false,
      arrows: true,
      fade: true,
      asNavFor: '#product-imgs',
    });

    // Product imgs Slick
    $('#product-imgs').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true,
      centerMode: true,
      focusOnSelect: true,
      centerPadding: 0,
      vertical: true,
      asNavFor: '#product-main-img',
      responsive: [{
        breakpoint: 991,
        settings: {
          vertical: false,
          arrows: false,
          dots: true,
        }
      },
      ]
    });

    // Product img zoom
    var zoomMainProduct = document.getElementById('product-main-img');
    if (zoomMainProduct) {
      $('#product-main-img .product-preview').zoom();
    }
  }
}
