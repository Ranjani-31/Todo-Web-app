const User = require('../models/userSchema')
const sendToken = require('../utils/sendToken')

exports.signup = async (req, res)=>{

    try{

   
    const {name, password, email} = req.body
    const newUser = await User.findOne({email})

    if (newUser) res.status(404).send('Email already exists!')

        newUser = await User.create({name, password, email})
        res.sendToken(newUser, res)

        res.status(201).json({
            message: 'Account created',
            user: {id: newUser._id, email: newUser.email, name: newUser.name}
        })

 }catch(err){
    res.status(404).json({message: err.message})
 }


}

exports.login = async (req, res)=>{
try{


    const {email, password} = req.body 

    const user = await User.findOne({email})

    if (!user) return res.status(404).json({message: 'Invalid Credentials'})

        const isMatch = await user.comparePassword(password)
        if(!isMatch) return res.status(404),json({message: 'Invalid Password!'})

        sendToken(user, res)
        res.status(200).json({
            message: 'Logged In',
            user: {id: user._id, email: user.password, name: user.name}})

            }catch(err){
                res.status(404).json({message: err.message})
            }

}

exports.logout = async (req, res)=>{

}