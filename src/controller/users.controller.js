const userService = require('../services/user.service');

module.exports = {
    getUsers: async (req, res) => {
        try {
            const response = await userService.getUsers();
            res.status(200).json(response);

        } catch (error) {
            console.error(error);
            res.status(500).json();
        }
    },
    getUserById: async (req, res) => {
        try {
            const { id } = req.params;
            const response = await userService.getuserById(id);
            res.status(200).json(response);
        } catch (error) {
            console.error(error);
            res.status(500).json();
        }
    },
    createUser: async (req, res) => {
        try {
            const { username, email, password } = req.body;
            const isUser = await userService.checkUserExist(username, email);
            if (isUser) {
                res.status(409).json({ message: 'user already exist' });
                return;
            }
            await userService.createUser({
                username,
                email,
                password
            });

            res.status(201).json();
        } catch (error) {
            console.error(error);
            res.status(500).json();
        }
    },
    updateUserById: async (req, res) => {
        try {
            const { id } = req.params;
            let { username, email, password } = req.body;
            await userService.updateUser({
                username, email, password, id
            })

            res.status(201).json();
        } catch (error) {
            console.error(error);
            res.status(500).json();
        }
    }
};