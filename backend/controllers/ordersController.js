const Orders = require('../modals/Orders')

//Insert in to Orders
insertOrders=(req,res)=>{
   let {userId} = req.body
   let orders = new Orders({
      userId
   })
   orders.save()
         .then((response)=>{
            if (response.length == 0) {
               res.status(201).json({
                  message : "No data Saved.."
               })
            }
            res.status(201).json({
               message : "Categories saved successfully..",
               response
            })
         })
         .catch((error) => {
            res.status(500).json({
               message: "Served error occurred..",
               error
            })
         })
}

//Get all Orders
getAllOrders=(req,res)=>{
   Orders.find()
         .then((response)=>{
            if (response.length == 0) {
               res.status(200).json({
                  message : "No Orders Available"
               })
            }
            res.status(200).json({
               message : "All orders are..",
               response
            })
         })
         .catch((error) => {
            res.status(500).json({
               message: "Served error occurred..",
               error
            })
         })
}

//Delete orders
deleteOrders=(req,res)=>{
   let {orderId} = req.params
   Orders.findByIdAndRemove({_id : orderId})
      .then((response)=>{
         res.status(200).json({
            message : "Deleted Order Successfully..",
            response
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
   insertOrders,
   getAllOrders,
   deleteOrders
}