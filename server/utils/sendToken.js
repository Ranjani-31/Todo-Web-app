const jwt = require("jsonwebtoken");

module.exports =async function sendToken(user, res) {
  const token =  jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
console.log("...")
 return  res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .json({
      message: "Account was created",
      user: { id: user._id, email: user.email, name: user.name },
    });

};
