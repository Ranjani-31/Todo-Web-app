const Todo = require('../models/todoSchema')

async function  updateOverDueTodos  (req, res, next){
    try{

    
    const userId = req.userId 

     const now = new Date()
     await Todo.updateMany({
        userId,
        dueDate: {$gte: now},
        status: {$in: ['in-progress', 'pending']},

     },
    {
        $set: {status: 'overdue'}
    })
    next()
}catch(err){
    console.log(err.message)
    res.status(404).json({message: err.message})
}
}
module.exports = updateOverDueTodos