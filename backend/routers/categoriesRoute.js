const router = require('express').Router()
let { insertCategories,getAllCategories,deleteCategories } = require('../controllers/categoriesController')

router.post('/categories',insertCategories)
router.get('/categories',getAllCategories)
router.delete('/categories/:categoriesId',deleteCategories)

module.exports = router