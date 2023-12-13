const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
require('dotenv').config()
_= require('underscore')

app.use(express.static(path.join(__dirname,'public')))

app.use(bodyParser.urlencoded({
    extended:true
}))

// router Section

const crudRouter = require('./routes/crud.routes')
app.use(crudRouter)

require(path.join(__dirname,'./config/database'))()

app.listen(process.env.PORT,()=>{
    console.log(`server is running at @http://127.0.0.1:${process.env.PORT}`);
})

