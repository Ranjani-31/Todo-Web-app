const jwt = require('jsonwebtoken');

module.exports = function sendToken(user, res){

    const token = jwt.sign(
        {userId: user._id},
        process.env.JWT_SECRECT,
        {expiresIn: process.env.JWT_EXPIRES_IN}
    );

    res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
        path: '/',
        maxAge:  7 * 24 * 60 * 60 * 1000
    }).status(200).json({message: 'Account was created'})
 
    return token;
}
