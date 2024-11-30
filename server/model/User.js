const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  role: {
    type: String,
    enum: ['student', 'collegeStudent', 'workingProffessional', 'freshmen'],
    default: 'student',
    required: true
  },
  password: {
    type: String,
    required: true
  },
  uid: {
    type: String,
    required: true
  },
  region: {
    type: String,
    required: true
  },
  refreshToken: {
    type: String,
    default: ''
  }
});

// * - Encrypt the user's password before storing it in the data base.
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();

  } catch (err) {
    console.error(`Error: ${err}`);
    next(err);
  }

})

const User = mongoose.model('User', userSchema);

module.exports = User;