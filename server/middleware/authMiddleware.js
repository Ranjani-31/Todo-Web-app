const jwt = require('jsonwebtoken');

const auth=  function(req, res, next){
    const token =req.cookies.token;
    console.log("exceuted auth")

    if (!token) 
        return res.status(401).json({message: 'Unauthorizied'})

    try{

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log("executed")

        req.userId =  decoded.userId
        next()

    }catch(err){  
        res.status(404).json({message: err.message})
    }  
}
module.exports = auth