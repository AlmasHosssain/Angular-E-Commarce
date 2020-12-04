const router = require('express').Router()
let { insertOrders,getAllOrders,deleteOrders } = require('../controllers/ordersController')
router.post('/orders',insertOrders)
router.get('/orders',getAllOrders)
router.delete('/orders/:orderId',deleteOrders)
module.exports = router