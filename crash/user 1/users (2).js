var LocalStrategy = require('passport-local').Strategy , User = require('../../app_api/models/users');

module.exports = function(passport) {  
                                      passport.serializeUser((user, done) => {
                                                                                 done(null, user.id);
                                                                });
  
                                      passport.deserializeUser((id, done) => {
                                                                                User.findById(id, function(err, user) {
                                                                                                                          done(err, user);
                                                                                                                  });
                                                                                                            });

  passport.use('local-signup', new LocalStrategy({
                                                    usernameField: 'email',
                                                                            passwordField: 'password',
                                                                                                        passReqToCallback: true,
  },

  function(req, email, password, done) {
                                          process.nextTick(function() {
                                                                        User.findOne({ 'local.email':  email }, (err, user) => {
                                                                                                                                  if (err) {
                                                                                                                                              return done(err);
                                                                                                                                  }
        if (user) {
                    return done(null, false);
        } else {
                  var newUser = new User();
                                            newUser.local.email = email;
                                                                         newUser.local.password = newUser.generateHash(password);
          newUser.save((err) => {
                                        if (err)
                                                  throw err;
                                                              return done(null, newUser);
                                });
                            }
                      });
                });
          }));

  passport.use('local-login', new LocalStrategy({
                                                  usernameField: 'email',
                                                                           passwordField: 'password',
                                                                                                      passReqToCallback: true,
  } ,  (req, email, password, done) => {
                                          User.findOne({ 'local.email':  email }, (err, user) => {
                                                                                                    if (err)  { 
                                                                                                                return done(err); }
                                        if (!user)
                                                    return done(null, false);
        if (!user.validPassword(password))
                                                    return done(null, false);
                        return done(null, user);
                    });
             }));  
};