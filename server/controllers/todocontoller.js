const Todo = require("../models/todoSchema");

exports.createTodo =async (req, res) => {
  try {
    const { title, description, status, priority, dueDate, userId } = req.body;

    const todo = await Todo.create({
      title,
      description,
      status,
      priority,
      dueDate,
      userId,
    });
    console.log(todo)
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
    res.status(404).json({ message: err.message });
  }
};

exports.updateTodo = async (req, res) => {

    try{

        const {id}= req.params
  const { title, description, status, priority, dueDate, userId} = req.body;
  console.log(userId)
  console.log(req.userId , 'userId')

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

        const date = new Date(req.query.date)
      console.log(date)
        const todos = await Todo.find({userId: req.userId, dueDate: date})
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

