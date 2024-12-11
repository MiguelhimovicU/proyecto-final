const express = require('express');

const authRouter = express.Router();
const {models} = require('../libs/sequelize');
const passport = require('passport');
const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/auth/signin'); // Redirige a la página de inicio de sesión si no está autenticado
    }
};
//RUTAS
authRouter.route('/signup')
.get(ensureAuthenticated,(req, res) => {
    res.render('auth/signup');
})
.post(async (req, res) => {
    //Crear usuario en BD
    const user = await models.User.create(req.body);
    console.log(user);
    //Autenticar
    req.login(user, () => {
        res.redirect('/adminproducts');
    });
});

authRouter.route('/signin')
.get((req, res) => {
    res.render('auth/signin');
})
.post(
    passport.authenticate('local', {
        successRedirect: '/adminproducts',
        failureRedirect: '/auth/signin',
        keepSessionAlive: true
    })
);


module.exports = authRouter;