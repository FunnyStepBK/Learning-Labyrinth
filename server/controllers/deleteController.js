const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleDelete = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) res.status(400).json({ "Error": "Fill all the required Entries" });

  try {
    const foundUser = await User.findOne({ username, email });
    if (!foundUser) res.sendStatus(401); // Unauthorized

    const match = bcrypt.compare(password, foundUser.password);

    if (match) {
      const result = await User.deleteOne({ _id: foundUser._id });
      if (result.deletedCount === 1) {
        return res.status(200).json({
          message: `User ${foundUser.username}  Successfully deleted.`
        });

      } else {
        return res.status(500).json({ message: "Failed to delete user." });
      }
    } else {
      return res.sendStatus(401); // Unauthorized
    }
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
}

module.exports = handleDelete;
