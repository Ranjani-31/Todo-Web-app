const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    title: {
        type:String,
        required: [true, 'Title is required'],
        trim: true,
        minLength:[3, 'Title must be at least 3 characters']
    },
    description: {
        type:String,
        
        trim: true,
   
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'in-progress'],
        default: 'pending'
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    dueDate: {
        type: Date,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt:{
        type:Date,
        required: true
    }

})

module.exports = mongoose.model('Todo', todoSchema)

