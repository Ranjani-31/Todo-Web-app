const router = require('express').Router()
const auth = require('../../middleware/authMiddleware.js')

const todo = require('../../controllers/todocontoller')
router.post('/add',auth, todo.createTodo);
router.put('/update/:id',auth, todo.updateTodo)
router.get('/get',auth, todo.getTodo)

module.exports = router