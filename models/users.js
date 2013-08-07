var crypto = require('crypto');
var moment = require('moment');

function getSalt() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c){
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
  });
}

function isValidEmail(email) {
  var exp = new RegExp(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/);
  return email.match(exp) === null;
}

function encodePass(password, salt) {
  return crypto.createHmac("sha1", salt)
    .update(password)
    .digest("hex");
}

function isValidPassword(user, password) {
  var encrypted = encodePass(password, user.salt);
  return (user.password === encrypted);
}

function isValidPasswordString(password) {
  return (password &&
    password.length >= 7);
}

exports.init = function (db) {
  var users = db.collection('users');
  return {
    create: function (dto, cb) {
      if (!isValidEmail(dto.email) || !isValidPasswordString(dto.password)) {
        return cb(new Error("Need both a valid email and a password of at least 7 characters"), false);
      }
      var salt = getSalt();
      var user = {
        email: dto.email,
        salt: salt,
        password: encodePass(dto.password, salt),
        role: dto.role || "user",
        created: moment.utc()
      }
      users.save(user, {safe: true}, cb);
    },
    authenticate: function (username, password, cb) {
      users.findOne({email: username }, validate);
      function validate(err, user) {
        if (err) { return cb(err); }
        if (!user) {
          return cb(null, false, { message: 'Incorrect username.' });
        }
        if (!isValidPassword(user, password)) {
          return cb(null, false, { message: 'Incorrect password.' });
        }
        return cb(null, user);
      }
    },
    findById: function(id, cb) {
      users.findById(id, cb);
    }
  };
};
