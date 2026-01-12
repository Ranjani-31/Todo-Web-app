const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minLength: [3, 'At least use 3 characters'],
        maxLength: [15, 'At most use 15 characters'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: [/\S+@\S+\.\S+/, 'Invalid email'],
        trim: true,
        index:true,
        unique: true,
        lowercase: true
    },
    password:{
        type: String,
        required: true,
        select: false
        
    }

})
userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt)
   
})

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}
const user = mongoose.model('User', userSchema)
module.exports = user

