const passport = require('passport');
require('./strategies/local.strategies');

module.exports = function setUpPassport(app) {
    app.use(passport.initialize());
    app.use(passport.session());
    
    passport.serializeUser((user, done) => {
        console.log('SERIALIZE USER');
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        console.log('DESERIALIZE USER');
        done(null, user);
    });
}