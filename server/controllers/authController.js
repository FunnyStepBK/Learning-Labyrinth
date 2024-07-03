const User = require('../model/User');
const bcrypt = require('bcrypt');
require('dotenv').config();

const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
  const { username, password, email, role } = req.body;
  if (!username, !password, !email) return res.status(400).json({ "Error": "Fill all the required entries." });
  const foundUser = await User.findOne({ username, email });

  // Unauthorized
  if (!foundUser) return res.status(404).json({ "Error": "Requested User dosen't exists in the Database" });

  // Evaluate the Password
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    const role = Object.values(foundUser.role);
    // create JWTs
    const accessToken = jwt.sign(
      {
        "UserInfo": {
          "username": foundUser.username,
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
    res.json({ accessToken });
  } else {
    res.sendStatus(401);
  }
}

module.exports = handleLogin 