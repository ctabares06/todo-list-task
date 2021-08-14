const authService = require('../services/auth.service');

module.exports = {
    async userLogin(req, res) {
        const { username, password } = req.body;
        const response = await authService.loginUser(username, password);
        if (response.auth) {
            res.status(200).json(response);
        } else {
            res.status(403).json(response);
        }
    }
}