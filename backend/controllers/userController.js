const bcrypt = require('bcrypt')
const User = require('../modals/User')

insertUser=(req,res)=>{
   let {username,password,email,fname,lname,age,role} = req.body
   bcrypt.hash(password,12,(err,hash)=>{
      if (err) {
         res.status(400).json({
            message : "Password hash error occurred..",
            error : err
         })
      }

         let user = new User({
            username,
            password : hash,
            email,
            fname,
            lname,
            age,
            role
         })

         user.save()
            .then((response)=>{
               console.log(response)
               res.status(201).json({
                  message : "User saved successfully..",
                  response
               })
           })
            .catch((error) => {
               res.status(500).json({
                  message: "Served error occurred..",
                  error
               })
            })
   })
}

getAllUsers=(req,res)=>{
        User.find()
            .then((response)=>{
               res.status(200).json({
                  message : "All Categories are..",
                  products : response
               })
            })
            .catch((error) => {
               res.status(500).json({
                  message: "Served error occurred..",
                  error
               })
            })
}


module.exports={
   insertUser,
   getAllUsers
}