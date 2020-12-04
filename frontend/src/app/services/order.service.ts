import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private serverUrl = environment.SERVER_URL
  constructor(private http: HttpClient) { }

  getSingleOrders = (_id: string) => {
    return this.http.get<OrderConfirmationResponse>(`${this.serverUrl}/orders/${_id}`)
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