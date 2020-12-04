const router = require('express').Router()
let { insertUser,getAllUsers } = require('../controllers/userController')

router.post('/info',insertUser)
router.get('/info',getAllUsers)

module.exports = router