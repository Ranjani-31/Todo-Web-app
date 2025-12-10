const jwt = require('jsonwebtoken')

module.exports = function sendToken(user, res){

    const token = jwt.sign(
        {userId: user._id},
        process.env.JWT_SECRECT,
        {expiresIn: process.env.JWT_EXPIRES_IN}
    );

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.COOKIE_SECURE === 'true',
        sameSite: 'lax',
        maxAge:  7 * 24 * 60 * 60 * 1000
    })

    return token;
}