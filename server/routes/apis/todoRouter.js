const router = require('express').Router()
const auth = require('../../middleware/authMiddleware.js')
const updateOverDueTodos = require("../../middleware/updateOverDueTodos")
const todo = require('../../controllers/todocontoller')

router.post('/add',auth,updateOverDueTodos, todo.createTodo);
router.put('/update/:id',auth,updateOverDueTodos, todo.updateTodo)
router.post('/get',auth,updateOverDueTodos, todo.getTodo)
router.post("/delete/:id", auth,updateOverDueTodos, todo.deleteTodo)

module.exports = router 