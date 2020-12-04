const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
   categories : {
      type : String
   },
   title : {
      type : String
   },
   image : {
      type : String
   },
   images :{
      type : String
   },
   description : {
      type : String
   },
   price : {
      type : Number
   },
   quantity : {
      type : Number
   },
   short_desc : {
      type : String
   },
   cat_id : {
      type : String
   }
})

const Products = mongoose.model('Products',productSchema)
module.exports = Products