const mongoose = require('mongoose')
const Schema = mongoose.Schema

const addressSchema = new Schema({
   line1: {
      type: String
   },
   lin2: {
      type: String
   },
   city: {
      type: String
   },
   state: {
      type: String
   },
   phone: {
      type: Number,
      trim: true
   },
   pinCode: {
      type: Number,
      trim: true
   },
   userId: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
   }]
}, {
   timestamps: true
})

const Address = mongoose.model('Address', addressSchema)
module.exports = Categories