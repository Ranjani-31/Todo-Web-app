 const express = require('express')
 const cookieParser = require('cookie-parser')
 const mongodb  = require('./config/db.js')
 const app = express();
app.use(express.json())
app.use(cookieParser())
mongodb()
app.use('/', require('./routes'))
 app.listen(3000, ()=>{
    console.log('server started')
 }) 