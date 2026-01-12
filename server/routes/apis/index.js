const router = require('express').Router();
 
router.use('/user', require('./userRouter'));
router.use('/todo', require('./todoRouter'));

module.exports = router;