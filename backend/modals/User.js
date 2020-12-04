const mongoose = require('mongoose')
const validator = require('validator')
const Schema = mongoose.Schema

const userSchema = new Schema({
   username: {
      type: String,
      trim: true,
      required: true
   },
   password: {
      type: String,
      required: true
   },
   email: {
      type: String,
      trim: true,
      required: true,
      validate: {
         validator: (email) => {
            return validator.isEmail(email)
         },
         message: "This email is not correct.Please Enter the Correct Email Please..."
      }
   },
   fname : {
      type : String
   },
   lname : {
      type : String
   },
   age : {
      type : Number
   },
   role : {
      type : Number
   }
},{timestamps : true})

const User = mongoose.model('User', userSchema)
module.exports = User