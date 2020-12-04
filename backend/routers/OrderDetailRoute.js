const router = require('express').Router()
let { addNewOrder,getAllOrders,getSingleOrder,deleteSingleOrder } = require('../controllers/orderDetailController')

router.post('/orders/New',addNewOrder)
router.get('/orders',getAllOrders)
router.get('/orders/:orderId',getSingleOrder)
router.delete('/orders/:orderId',deleteSingleOrder)

module.exports = router