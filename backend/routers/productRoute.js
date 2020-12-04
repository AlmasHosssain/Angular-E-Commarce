const router = require('express').Router()
let { insertProducts,deleteProduct,getAllProduct,getSingleProduct,getProductAccordingToCategories } = require('../controllers/productControler')
router.post('/product',insertProducts)
router.get('/product',getAllProduct)
router.delete('/product/:productId',deleteProduct)
router.get('/product/:productId',getSingleProduct)
 router.get('/product/category/:catName',getProductAccordingToCategories)

module.exports = router