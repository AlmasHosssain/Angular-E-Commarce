const Product = require('../modals/Products')

//Insert product
insertProducts=(req,res)=>{
   let {categories,title,image,images,description,price,quantity,short_desc,cat_id} = req.body

   let product = new Product({
      categories,
      title,
      image,
      images,
      description,
      price,
      quantity,
      short_desc,
      cat_id
   })

   product.save()
         .then((response)=>{
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
}

//Delete product
deleteProduct=(req,res)=>{
   let {productId} = req.params
   Product.findByIdAndRemove({_id : productId})
         .then((response)=>{
            res.status(200).json({
               message : "Deleted Product Successfully..",
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

//Get all product
getAllProduct=(req,res)=>{
   Product.find()
         .then((response)=>{
            if (response.length == 0) {
               res.status(200).json({
                  message : "No Product Available"
               })
            }
            res.status(200).json(response)
         })
         .catch((error) => {
            res.status(500).json({
               message: "Served error occurred..",
               error
            })
         })
}

//Get Single Product
getSingleProduct=(req,res)=>{
   let {productId} = req.params
   //console.log(typeof(productId))
   Product.findById({_id : productId})
         .then((response)=>{
            if (response.length == 0) {
               res.status(200).json({
                  message : "No Product Available"
               })
            }
            res.status(200).json(response)
         })
         .catch((error) => {
            res.status(500).json({
               message: "Served error occurred..",
               error
            })
         })
}

//Get product according to the categories
getProductAccordingToCategories=(req,res)=>{
   let {catName} = req.params
   Product.find({categories : catName})
          .then((response)=>{
             if (response.length == 0) {
               res.status(200).json({
                  message : "No product is present in this type"
               })
             }
            res.status(200).json({
               message : "Product of specific categories are",
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
   insertProducts,
   deleteProduct,
   getAllProduct,
   getSingleProduct,
   getProductAccordingToCategories
}