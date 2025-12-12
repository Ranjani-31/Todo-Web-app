const router = require('express').Router()
const authCtrl = require('../../controllers/userController')
router.get('/hello', (req, res)=>{
    res.status(200).send('helo')
    console.log("hello")
})
router.post('/signup', authCtrl.signup)
router.post('/login', authCtrl.login)
router.post('/logout', authCtrl.logout)

module.exports= router;