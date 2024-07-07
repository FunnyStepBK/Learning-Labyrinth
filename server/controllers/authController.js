const User = require('../model/User');
const bcrypt = require('bcrypt');
require('dotenv').config();

const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
  const { password, email } = req.body;
  if ( !password, !email) return res.status(400).json({ 
    errorCode: '#1001', 
    message: "Fill all the required entries.",
    success: false
  });
  const foundUser = await User.findOne({ email });

  // Unauthorized
  if (!foundUser) return res.status(404).json({ 
    errorCode: '#1002', 
    message: "Requested user dosen't exist in the Database",
    success: false
  });

  // Evaluate the Password
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    const role = Object.values(foundUser.role);
    // create JWTs
    const accessToken = jwt.sign(
      {
        "UserInfo": {
          "id": foundUser.uid,
          "role": role
        }
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '2min' }
    );

    const refreshToken = jwt.sign(
      { "username": foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '10d' }
    );

    // * Saving refresh token and the access token with the current user
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();
    console.log(result);

    res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: (24 * 60 * 60 * 1000) * 4 });
    res.json({ 
      username: foundUser.username,
      message: `Successfully logged in as ${foundUser.username}`,
      success: true
    });
  } else {
    return res.status(401).json({
      erroCode: "#1003",
      message: "Invalid password",
      success: false
    });
  }
}

module.exports = handleLogin