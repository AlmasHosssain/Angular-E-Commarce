import { OrderService } from './order.service';
import { ProductModel } from './../models/product.model';
import { Router, NavigationExtras } from '@angular/router';
import { CartModelPublic, CartModelServer } from './../models/cart.model';
import { environment } from './../../environments/environment';
import { ProductService } from './product.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private serverURL = environment.SERVER_URL;
  public check: boolean;
  private cartDataClient: CartModelPublic = {
    total: 0,
    prodData: [{
      product_id: '',
      title: '',
      price: 0,
      inCart: 0
    }]
  }

  private cartDataServer: CartModelServer = {
    total: 0,
    data: [{
      product: undefined,
      inCart: 0
    }]
  }

  cartTotal$ = new BehaviorSubject<number>(0);
  cartData$ = new BehaviorSubject<CartModelServer>(this.cartDataServer)

  constructor(private http: HttpClient,
    private productService: ProductService,
    private orderService: OrderService,
    private router: Router) {

    this.cartTotal$.next(this.cartDataServer.total)
    this.cartData$.next(this.cartDataServer)

    let localInfo: CartModelPublic = JSON.parse(localStorage.getItem('cart'))
    //console.log(localInfo)
    if (localInfo !== null && localInfo !== undefined) {
      this.cartDataClient = localInfo
      this.cartDataClient.prodData.forEach((singleProduct) => {
        this.productService.getSingleProduct(singleProduct.product_id)
          .subscribe((actualProduct: ProductModel) => {
            if (this.cartDataServer.data[0].inCart == 0) {
              this.cartDataServer.data[0].inCart = singleProduct.inCart
              this.cartDataServer.data[0].product = actualProduct
              //TODO calculation
              this.CalculateTotal()
              this.cartDataClient.total = this.cartDataServer.total
              localStorage.setItem('cart', JSON.stringify(this.cartDataClient))
            } else {
              this.cartDataServer.data.push({
                product: actualProduct,
                inCart: singleProduct.inCart
              })
              //TODO calculation
              this.CalculateTotal()
              this.cartDataClient.total = this.cartDataServer.total
              localStorage.setItem('cart', JSON.stringify(this.cartDataClient))
            }
            this.cartData$.next({ ...this.cartDataServer })
          })
      })
    }
  }

  AddProductToCart = (_id: string, quantity?: number) => {
    this.productService.getSingleProduct(_id).subscribe(prod => {
      if (this.cartDataServer.data[0].product == undefined) {
        this.cartDataServer.data[0].product = prod
        this.cartDataServer.data[0].inCart = quantity !== undefined ? quantity : 1
        //TODO calculation
        this.CalculateTotal()
        this.cartDataClient.prodData[0].product_id = prod._id
        this.cartDataClient.prodData[0].price = prod.price
        this.cartDataClient.prodData[0].title = prod.title
        this.cartDataClient.prodData[0].inCart = this.cartDataServer.data[0].inCart
        this.cartDataClient.total = this.cartDataServer.total

        localStorage.setItem('cart', JSON.stringify(this.cartDataClient))
        this.cartData$.next({ ...this.cartDataServer })

      } else {

        let index = this.cartDataServer.data.findIndex(pd => pd.product._id == prod._id)
        if (index !== -1) {
          if (quantity !== undefined && quantity < prod.quantity) {
            this.cartDataServer.data[index].inCart = this.cartDataServer.data[index].inCart < prod.quantity ? quantity : prod.quantity
          } else {
            this.cartDataServer.data[index].inCart < prod.quantity ?
              this.cartDataServer.data[index].inCart++ : prod.quantity
          }

          this.cartDataClient.prodData[index].inCart = this.cartDataServer.data[index].inCart
          this.CalculateTotal()
          this.cartDataClient.total = this.cartDataServer.total
          localStorage.setItem('cart', JSON.stringify(this.cartDataClient))


        } else {
          this.cartDataServer.data.push({
            product: prod,
            inCart: 1
          })

          this.cartDataClient.prodData.push({
            product_id: prod._id,
            title: prod.title,
            price: prod.price,
            inCart: 1
          })
          this.CalculateTotal()
          this.cartDataClient.total = this.cartDataServer.total
          localStorage.setItem('cart', JSON.stringify(this.cartDataClient))
          this.cartData$.next({ ...this.cartDataServer })
        }

      }
    })
  }

  UpdateCartData = (index: number, increase: boolean) => {
    let data = this.cartDataServer.data[index]
    if (increase) {
      data.inCart < data.product.quantity ? data.inCart++ : data.product.quantity
      this.cartDataClient.prodData[index].inCart = data.inCart

      this.CalculateTotal()
      this.cartDataClient.total = this.cartDataServer.total
      localStorage.setItem('cart', JSON.stringify(this.cartDataClient))
      this.cartData$.next({ ...this.cartDataServer })
    } else {
      data.inCart--
      if (data.inCart < 1) {
        this.DeleteProductFromCart(index)
        this.cartDataServer.data[index].inCart = 1
        this.cartData$.next({ ...this.cartDataServer })
      } else {
        this.cartData$.next({ ...this.cartDataServer })
        this.cartDataClient.prodData[index].inCart = data.inCart

        this.CalculateTotal()
        this.cartDataClient.total = this.cartDataServer.total
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient))
      }
    }
  }

  DeleteProductFromCart = (index: number) => {
    if (window.confirm('Are You Sure To Delete This product.')) {
      this.cartDataServer.data.splice(index, 1)
      this.cartDataClient.prodData.splice(index, 1)
      this.CalculateTotal()
      this.cartDataClient.total = this.cartDataServer.total;
      if (this.cartDataClient.total == 0) {
        this.cartDataClient = {
          total: 0,
          prodData: [{
            product_id: '',
            title: '',
            price: 0,
            inCart: 0
          }]
        }
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient))
      } else {
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient))
      }

      if (this.cartDataServer.total == 0) {
        this.cartDataServer = {
          total: 0,
          data: [{
            product: undefined,
            inCart: 0
          }]
        }
        this.cartData$.next({ ...this.cartDataServer })
      } else {
        this.cartData$.next({ ...this.cartDataServer })
      }
    } else {
      //If press the cancel button.
      return
    }

  }

  CalculateTotal = () => {
    let totalCal = 0
    this.cartDataServer.data.forEach((singleProd) => {
      let { inCart } = singleProd
      let { price } = singleProd.product
      totalCal += inCart * price
    })
    this.cartDataServer.total = totalCal
    this.cartTotal$.next(this.cartDataServer.total)

  }

  CalculateSubTotal = (index): number => {
    let subTotal = 0;
    let product = this.cartDataServer.data[index]
    subTotal = product.inCart * product.product.price

    return subTotal
  }


  CheckOutFromCart = (userId) => {
    //this.resetServerData()
    this.http.post(`${this.serverURL}/orders/New`, {
      userId: userId,
      products: this.cartDataClient.prodData
    }).subscribe((data: OrderConfirmationResponse) => {
      this.orderService.getSingleOrders(data._id).subscribe(prods => {
        const navigationExtras: NavigationExtras = {
          state: {
            orderDetail: prods.orderDetail,
            total: this.cartDataClient.total,
          }
        }
        this.router.navigate(['/thankyou']).then((pd) => {
          this.cartDataClient = {
            total: 0,
            prodData: [{
              product_id: '',
              title: '',
              price: 0,
              inCart: 0
            }]
          }
          //this.cartTotal$.next(0)
          localStorage.setItem('cart', JSON.stringify(this.cartDataClient))
        })
      })
    })
  }
  finish = () => {
    this.resetServerData()
    this.cartTotal$.next(0)
  }
  resetServerData = () => {
    this.cartDataServer = {
      total: 0,
      data: [{
        product: undefined,
        inCart: 0
      }]
    }
    this.cartData$.next({ ...this.cartDataServer })
  }
}

interface OrderConfirmationResponse {
  orderDetail: [{
    product_id: '',
    title: '',
    price: 0,
    inCart: 0
  }];
  _id: string,
  userName: string
}