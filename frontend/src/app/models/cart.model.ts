import { ProductModel } from './product.model';

export interface CartModelServer {
   total: number,
   data: [
      {
         product: ProductModel,
         inCart: number
      }
   ]
}

export interface CartModelPublic {
   total: number,
   prodData: [
      {
         product_id: string,
         title: string,
         price: number,
         inCart: number
      }
   ]
}