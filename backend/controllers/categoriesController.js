const Categories = require('../modals/Categories')

 insertCategories=(req,res)=>{
   let {title} = req.body
   let categories = new Categories({
      title
   })
   categories.save()
            .then((response)=>{
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

getAllCategories=(req,res)=>{
   Categories.find()
            .then((response)=>{
               res.status(201).json({
                  message : "All Categories are..",
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

deleteCategories=(req,res)=>{
   let {categoriesId} = req.params
   Categories.findByIdAndRemove({_id : categoriesId})
         .then((response)=>{
            res.status(200).json({
               message : "Deleted Categories is..",
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
   insertCategories,
   getAllCategories,
   deleteCategories
}