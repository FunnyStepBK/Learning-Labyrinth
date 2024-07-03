const User = require('../model/User');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  console.log(cookies.jwt);
  const refreshToken = cookies.jwt;

  try {
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) return res.sendStatus(403); // Forbidden 

    // evaluate jwt 
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err || foundUser.username !== decoded.username) return res.sendStatus(403);

        const role = Object.values(foundUser.role);
        const accessToken = jwt.sign(
          {
            "UserInfo": {
              "username": decoded.username,
              "role": role
            }
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '2min' }
        );
        res.json({ accessToken });
      }
    );
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
}

module.exports = { handleRefreshToken }