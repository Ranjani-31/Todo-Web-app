const router = require('express').Router()
const authCtrl = require('../../controllers/userController')
const auth = require("../../middleware/authMiddleware")
router.post('/signup', authCtrl.signup)
router.post('/login', authCtrl.login)
router.post('/logout', authCtrl.logout)
router.get('/profile', auth, authCtrl.getUser)

module.exports= router;