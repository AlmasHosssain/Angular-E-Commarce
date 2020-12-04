const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())

const categoriesRoute = require('./routers/categoriesRoute')
const userRoute = require('./routers/userRoute')
const productRoute = require('./routers/productRoute')
const ordersRoute = require('./routers/OrderDetailRoute')

app.use('/product',categoriesRoute)
app.use('/user',userRoute)
app.use('/api',productRoute)
app.use('/api',ordersRoute)

//app.get('/',(req,res))
const PORT = 4000 | process.env.PORT

app.listen(PORT,()=>{
   console.log(`Server is ready to run on the port ${PORT}`)
   mongoose.connect('mongodb://localhost/productDatabase',{
      useNewUrlParser : true
   },()=>{
      console.log(`Database connected successfully...`)
   })
})


