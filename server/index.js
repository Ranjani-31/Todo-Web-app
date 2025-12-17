 const express = require('express')
 const cookieParser = require('cookie-parser')
const cors = require('cors')

 const mongodb  = require('./config/db.js')
 const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
const listEndpoints = require("express-list-endpoints");
console.log(listEndpoints(app));

app.use(express.json())
app.use(cookieParser())
mongodb()

app.use('/', require('./routes'))
 app.listen(5000, ()=>{
    console.log('server started')
 })  