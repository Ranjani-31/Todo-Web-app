const router = require('express').Router();

router.get('/user', require('./userRouter'))
router.get('/todo', require('./todoRouter'))

