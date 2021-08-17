const passport = require('passport');

const attempLogin = passport.authenticate('basic', { session: false });

module.exports = {
    attempLogin,
}