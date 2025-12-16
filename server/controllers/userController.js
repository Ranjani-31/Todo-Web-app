const User = require("../models/userSchema");
const sendToken = require("../utils/sendToken");

exports.signup = async (req, res) => {
  try {
    console.log("sign up called...");
    const { name, password, email } = req.body;
    let newUser = await User.findOne({ email });
    if  (newUser) return res.status(404).send("Email already exists!");


    if (name.length <= 3)
     return  res.status(400).json({ message: "Name is too short" });

    const email_regex = /^[a-zA-z\d]+@gmail\.com$/
    if (!email_regex.test(email)) return res.status(400).json({message: "Invalid email"})
        console.log(email_regex.test(email))

    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*-_?~])[A-Za-z\d!@#$&_-]{8,15}$/;

    
    if (!/(?=.*[A-Z])/.test(password))

      return res
        .status(400)
        .json({ message: "Add at least one capital letter." });

     if (!/(?=.*[a-z])/.test(password)) 
      return res
        .status(400)
        .json({ message: "Add at least one smaill letter" });

     if (!/(?=.*\d)/.test(password))
      return res.status(400).json({ message: "Add at least one digit" });
     if (!/(?=.*[^A-Za-z0-9])/.test(password)) return res.status(400).json({message: 'use at least one special character'})
     if (!(password.length >=8 || password.length<=15)) return res.status(400).json({message: 'password must be between 8-15 charaters'})
   




    newUser = await User.create({ name, password, email });
   return sendToken(newUser, res);


  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "Invalid email!" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(404), json({ message: "Invalid Password!" });

    sendToken(user, res);
    res.status(200).json({
      message: "Logged In",
      user: { id: user._id, email: user.email, name: user.name },
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};


exports.logout = async (req, res) => {
  res.clearToken("token", {
    httpOnly: true,
    secure: process.env.COOKIE_SECURE === "true",
    sameSite: "lax",
  });
  res.status(200).json({ message: "successfully Logged Out" });
};
