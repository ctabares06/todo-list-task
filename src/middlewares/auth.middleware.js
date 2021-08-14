const { verifyToken } = require('../services/auth.service');

const checkToken = (req, res, next) => {
    const _token = req.headers['x-access-token'];
    verifyToken(_token).then(() => {
        next();
    }).catch(err => {
        res.status(401).json(err);
    });
}

module.exports = {
    checkToken,
}