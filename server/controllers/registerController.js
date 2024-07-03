const User = require('../model/User');
const uid = require('randomized-string');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleRegister = async (req, res) => {
  const { username, password, email, role } = req.body;
  if (!username || !password || !email || !role) res.status(400).json('Error: Required fields cannot be empty!');

  const duplicate = await User.findOne({ $or: [{ username }, { email }] }).exec();
  if (duplicate) return res.sendStatus(409); // ? - Conflict
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
      tokens: {
        "refreshToken": refreshToken
      },
      "uid": uid.generate(8)
    });

    console.log(result);

    res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: (24 * 60 * 60 * 1000) * 4 });
    res.status(201).json({ 'suucess': `New User ${username} created!` })
  } catch (err) {
    res.status(500).json({ 'message': err.message });
  }
}

module.exports = { handleRegister };