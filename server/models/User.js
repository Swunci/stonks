const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const User = new Schema ({
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  portfolios: {type: [{type: Schema.Types.ObjectID, ref: 'Portfolio'}]}
});

User.pre('save', function(next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (hashErr, hash) => {
      if (hashErr) {
        return next(hashErr);
      }
      user.password = hash;
      next();
    })
  })
});

User.methods.comparePassword = function(toCompare, done) {
  bcrypt.compare(toCompare, this.password, (err, isMatch) => {
    if (err) {
      done(err);
    }
    else {
      done(err, isMatch);
    }
  })
}

module.exports = mongoose.model('User', User);