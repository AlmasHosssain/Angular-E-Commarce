const Orders = require('../modals/Orders')
const Order_detail = require('../modals/Order_detail')
const Product = require('../modals/Products')
const User = require('../modals/User')


//Add new order
addNewOrder=(req,res)=>{
   let {userId,products} = req.body 
   User.find({_id : userId})
      .then((response)=>{
         let orderDetails = new Order_detail({
            orderDetail : products,
            username : response[0].username
         })

         orderDetails.save()
                  .then((response1)=>{
                     response1.orderDetail.forEach((value)=>{
                        products.forEach((value) => {
                              Product.findOne({_id : value.product_id})
                                    .then((response2)=>{
                                       let inCart = parseInt(value.inCart)
                                       if (response2.quantity > 0) {
                                          response2.quantity = response2.quantity - inCart
                                          if (response2.quantity < 0) {
                                             response2.quantity = 0;
                                          }
                                       }else{
                                          response2.quantity = 0;
                                       }
                                       Product.findByIdAndUpdate({_id : response2._id},{$set : response2},{new : true})
                                             .then((response3)=>{
                                             })
                                             .catch((error)=>{
                                                res.status(500).json({
                                                   message : "Server error occurred 3..",
                                                   error
                                                })
                                             })
                                    })
                                    
                                    .catch((error)=>{
                                       res.status(500).json({
                                          message : "Server error occurred 2..",
                                          error
                                       })
                                    })
                           });
                     })

                     res.status(201).json(response1)
                  })
                  .catch((error)=>{
                     res.status(500).json({
                        message : "Server error occurred 2..",
                        error
                     })
                  })
      })
      .catch((error)=>{
            res.status(500).json({
               message : "Server error occurred 1..",
               error
            })
         })
}

//Get all orders
getAllOrders=(req,res)=>{
   Order_detail.find()
            .then((response)=>{
               if(response.length == 0){
                  res.status(200).json({
                  message : "No order present here.."
               })
               }else{
                  res.status(200).json({
                  message : "All orders present here..",
                  response
               })
               }
            })
            .catch((error)=>{
               res.status(500).json({
                  message : "Server error occurred..",
                  error
               })
            })
}

//Get single order..
getSingleOrder=(req,res)=>{
   let {orderId} = req.params
   Order_detail.findOne({_id : orderId})
               .then((response)=>{
                  res.status(200).json(response)
               })
               .catch((error)=>{
                  res.status(500).json({
                     message : "Server error occurred..",
                     error
                  })
               })
}

//Delete single Order
deleteSingleOrder=(req,res)=>{
   let {orderId} = req.params
   Order_detail.findByIdAndRemove({_id : orderId})
               .then((response)=>{
                  res.status(200).json({
                     message : "Message deleted successfully..",
                     response
                  })
               })
               .catch((error)=>{
                  res.status(500).json({
                     message : "Server error occurred..",
                     error
                  })
               })
}
module.exports={
   addNewOrder,
   getAllOrders,
   getSingleOrder,
   deleteSingleOrder
}