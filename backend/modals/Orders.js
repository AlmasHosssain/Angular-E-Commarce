const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ordersSchema = new Schema({
   userId : {
      type : String,
      required : true
   }
})

const Orders = mongoose.model('Orders',ordersSchema)
module.exports = Orders