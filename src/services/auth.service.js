const jwt = require('jsonwebtoken');
const { getUserForLogin } = require('../repos/user.repository');
const { verifyUser } = require('./user.service');

const loginUser = (username, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await getUserForLogin(username);
            if (user.length === 0) {
                resolve({
                    auth: false,
                    _token: '',
                })
            }
            const correctPassword = verifyUser(password, user[0].salt, user[0].password);
            if (correctPassword) {
                resolve({
                    auth: true,
                    _token: jwt.sign({ user: user[0].id }, process.env.SECRET, {
                        expiresIn: "1h",
                    })
                })
            } else {
                resolve({
                    auth: false,
                    _token: '',
                })
            }

        } catch (error) {
            reject(error);
        }

    });
}

const decodeToken = (_token) => jwt.verify(_token, process.env.SECRET);

const verifyToken = (_token) => {
    try {
        if (!_token) {
            return Promise.reject({
                auth: false,
                _token: null,
                message: "need a token to continue",
            })
        }
        const verifiedToken = decodeToken(_token);
        return Promise.resolve({
            auth: true,
            _token: verifiedToken,
            message: '',
        });
    } catch (error) {
        return Promise.reject({
            auth: false,
            _token: null,
            message: error.message,
        });
    }
}

module.exports = {
    loginUser,
    decodeToken,
    verifyToken,
}