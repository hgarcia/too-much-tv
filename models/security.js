
exports.init = function (users, config) {
  if (!config) { config = {}; }
  if (!config.loginUrl) { config.loginUrl = "/admin/login"; }
  return {
    authenticate: function (options) {
      if (!options) { options = {}; }
      if (!options.errRedirect) { options.errRedirect = config.loginUrl; }
      return function (req, res, next) {
        var usr = req.body[config.username || "email"];
        var pwd = req.body[config.password || "password"];
        users.authenticate(usr, pwd, authOrErr);
        function authOrErr(err, user) {
          if (user) {
            req.session.user = user;
          }
          if (err) {
            res.redirect(options.errRedirect, {err: err});
          } else if (options.successRedirect) {
            res.redirect(options.successRedirect);
          } else {
            next();
          }
        }
      }
    },
    authorize: function (options) {
      if (!options) { options = {}; }
      if (!options.errRedirect) { options.errRedirect = config.unAuthorizeUrl; }
      return function (req, res, next) {
        if (!req.session.user) {
          res.redirect(config.loginUrl);
        } else {
          next();
        }
      }
    },
    logout: function (req, res) {
      req.session.destroy(function () {
          res.redirect(config.loginUrl);
      });
    }
  };
};
