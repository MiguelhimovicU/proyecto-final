const passport = require('passport');
const LocalStrategy = require('passport-local');

const {models} = require('../../libs/sequelize');

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
}, async (username, password, done) => {
    const user = await models.User.findOne({where: {username, password}});
    if(!user){
        return done(null, false, {message: 'Usuario o contraseña incorrectos'});
    } else {
        return done(null, user);
    }
}));