const User = require('../model/User');
const uid = require('randomized-string');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleRegister = async (req, res) => {
  const { username, password, email, role, region, phone } = req.body;
  if (!username || !password || !email || !role || !region || !phone) return res.status(400).json({ 
    errorCode: '#1001', 
    message: "Fill all the required entries.",
    success: false
  });
  
  const duplicate = await User.findOne({
    $or: [
      { email: email },
      { phone: phone }
    ]
  }).exec();
  
  if (duplicate) {
    let message = '';
    let errorCode = '';
    if (duplicate.email === email) {
      message = 'Email is already registered.';
      errorCode = '#1004'
    } else if (duplicate.phone === phone) {
      message = 'Phone number is already registered.';
      errorCode = '#1006'
    }
  
    return res.status(409).json({
      errorCode,
      message: message,
      success: false
    });
  }
  
  try {
    const accessToken = jwt.sign(
      {
        "UserInfo": {
          "username": username,
          "role": role
        }
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '2min' }
    );

    const refreshToken = jwt.sign(
      { "username": username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '10d' }
    );

    const result = await User.create({
      "username": username,
      "password": password,
      email,
      "role": role,
      region,
      tokens: {
        "refreshToken": refreshToken
      },
      "uid": uid.generate(8)
    });

    console.log(result);

    res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: (24 * 60 * 60 * 1000) * 4 });
    return res.status(201).json({ 
      username,
      message: `New User ${username} created!`,
      success: true,
      accessToken
    })
  } catch (err) {
    res.status(500).json({ 
      errorCode: "#1005",
      message: "Server encountered an unexpected condition",
      success: false
    });
  }
}

module.exports = { handleRegister };