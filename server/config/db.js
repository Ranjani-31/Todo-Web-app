const mongoose = require('mongoose')
require('dotenv').config();
const mongodb = async()=>{
    try{
       await mongoose.connect(process.env.db
       )

        console.log('monogdb connected successfully..')
    }catch(err){
        console.log(err.message)
        process.exit(1)
    }
}


module.exports = mongodb 