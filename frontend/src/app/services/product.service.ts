import { ProductModel } from './../models/product.model';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private SERVER_URL = environment.SERVER_URL

  constructor(private http: HttpClient) { }

  //Get all the data from the server
  getAllProducts = (): Observable<ProductModel[]> => {
    return this.http.get<ProductModel[]>(this.SERVER_URL + '/product')
  }

  //Get single product
  getSingleProduct = (_id: string) => {
    return this.http.get<ProductModel>(this.SERVER_URL + '/product/' + _id)
  }

  //Get product according to the categories
  getProductsFromCategory = (catName: string): Observable<ProductModel[]> => {
    return this.http.get<ProductModel[]>(this.SERVER_URL + '/product/category/' + catName)
  }
}
