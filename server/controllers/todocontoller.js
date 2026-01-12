const Todo = require("../models/todoSchema");

exports.createTodo =async (req, res) => {
  try {
    const userId=req.userId
    const { title, description, status, priority, dueDate } = req.body;
    const todo = await Todo.create({
      title,
      description,
      status,
      priority,
      dueDate,
      userId,
    });
    res.status(201).json({
      message: "Todo Created",
      todo: {
        id: todo._id,
        title: todo.title,
        description: todo.description,
        status: todo.status,
        priority: todo.priority,
        dueDate: todo.dueDate,
        userId: todo.userId,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateTodo = async (req, res) => {

    try{

        const {id}= req.params
        const userId = req.userId
  const { title, description, status, priority, dueDate} = req.body;
      const todoChecker= await Todo.findById(id)
      if (todoChecker.status=='overdue'){
        return res.status(400).json({message: 'Can not modify'})
      }

  const todo =await Todo.findOneAndUpdate(
    { _id: id, userId},
    { title, description, status, priority, dueDate },
    { new: true, runValidators: true }
  );
  console.log(todo)

  if (!todo) return res.status(400).json({message: 'not found'})

    res.status(200).json({message:'updated',
        todo: {
             id: todo._id,
        title: todo.title,
        description: todo.description,
        status: todo.status,
        priority: todo.priority,
        dueDate: todo.dueDate,
        userId: todo.userId,
        }
    })
    
    }catch(err){
        res.status(404).json({message: err.message})
    }
};

exports.getTodo = async (req, res)=>{

    try{

      let date = new Date(req.body.date) 
      
      const startDate=new Date(date)
      const endDate=new Date(date)
     

      
        const todos = await Todo.find({userId: req.userId, date: {$gle: startDate, $lte: endDate}})
        res.status(200).json( 
            {
                todos: todos.map(item=>({
                    id: item.id,
                    title: item.title,
                    description: item.description,
                    status: item.status,
                    priority: item.priority,
                    dueDate: item.dueDate

                }))
            }
        )
    }catch(err){
        res.status(404).json({message: err.message})
    }
}

exports.deleteTodo= async (req, res)=>{

  try{
    const {id }= req.params
    console.log(id)

    const userId = req.userId 
    const todo = await Todo.findOneAndDelete({_id: id, userId})

    if (!todo){
      return res.status(400).json({message: "Not found"})
    }
    console.log("deleted")
    return res.status(200).json({message: "successfully deleted"})
  }catch(err){
    res.status(500).json({message: err.message})
  }
}  