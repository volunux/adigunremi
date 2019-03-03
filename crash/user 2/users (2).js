var passport = require('passport') , LocalStrategy = require('passport-local').Strategy ,  User = require('../../app_api/models/users') ;

passport.use(new LocalStrategy( (username, password, done) => {
                                                                  User.findOne({ username: username }, (err, user) => {
                                                                                                                        if (err) { return done(err); }
                                                                                                                                                          if (!user) {
                                                                                          return done(null, false, { message: 'Incorrect username.' });
                                                                                       }
                                                if (!user.validPassword(password)) {
                                                                                      return done(null, false, { message: 'Incorrect password.' });
                                                }
                                                      return done(null, user);
                                    });
                    }
));

passport.serializeUser((user, done) => {
                                                done(null, user.id);
                          });

passport.deserializeUser((id, done) => {
                                          User.findById(id, (err, user) => {
                                                                              done(err, user);
                                      });
                                });