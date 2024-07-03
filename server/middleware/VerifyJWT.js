const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401); // Unauthorized
  const token = authHeader.split(' ')[1];

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => {
      if (err) {
        console.error('JWT Verification Error:', err);
        return res.sendStatus(403); // Forbidden
      }

      if (!decoded || !decoded.UserInfo) {
        console.error('Invalid Token Structure:', decoded);
        return res.sendStatus(403); // Forbidden
      }

      req.username = decoded.UserInfo.username;
      req.role = decoded.UserInfo.role;
      next();
    }
  );
}

module.exports = verifyJWT;
