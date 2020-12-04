const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderDetailSchema = new Schema({
   // order_id : {
   //    type : String
   // },
   // product_id : {
   //    type : String
   // },
   // quantity : {
   //    type : Number
   // },
   // title : {
   //    type : String
   // },
   // description : {
   //    type : String
   // },
   // price : {
   //    type : String
   // },
   orderDetail : [
      {
         type : Object
      }
   ],
   username : {
      type : String
   }
})

const Order_detail = mongoose.model('Order_detail',orderDetailSchema)
module.exports = Order_detail