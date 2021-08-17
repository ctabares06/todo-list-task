const User = require('../models/user.model');

module.exports = {
    async getUsers() {
        return await User.get();
    },
    async getUserById(id) {
        return await User.getById(id);
    },
    async getFullUser(id) {
        return await User.getFullById(id);
    },
    async getUserForLogin(user){
        return await User.getByNameOrEmail(user, user);
    },
    async getUserByToken(id){
        return await User.getByToken(id);
    },
    async checkUserExist(username, email) {
        return await User.getByNameOrEmail(username, email);
    },
    async createUser(userData) {
        return await User.create(userData);
    },
    async updateUser(userData) {
        return await User.update(userData);
    },
}