const crypto = require('crypto');
const userRepository = require('../repos/user.repository');

const generateHash = (password, salt = null) => {
    salt = salt ? salt : crypto.randomBytes(8).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 32, 'sha256').toString('hex');

    return {
        salt,
        hash
    }
}

const verifyUser = (password, salt, hash) => generateHash(password, salt).hash === hash;

const getUsers = async () => await userRepository.getUsers();
const getuserById = async (id) => await userRepository.getUserById(id);

const checkUserExist = (username, email) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await userRepository.checkUserExist(username, email);
            if (response > 0) resolve(true);
            else resolve(false);

        } catch (error) {
            reject(error);
        }
    });
}

const createUser = async ({ username, email, password }) => {
    const { salt, hash } = generateHash(password);
    await userRepository.createUser({
        username,
        email,
        hash,
        salt
    })
}

const updateUser = async ({ username, email, password, id }) => {
    const userData = await userRepository.getFullUser(id);
    username = username === '' ? userData.username : username;
    email = email === '' ? userData.email : email;
    const { salt, hash } = (password || !verifyUser(password, userData.salt, userData.hash))
        ? generateHash(password, userData.salt) : { salt: userData.salt, hash: userData.hash };

    await userRepository.updateUser({
        username,
        email,
        salt,
        hash,
        id,
    })
}

module.exports = {
    getUsers,
    generateHash,
    getuserById,
    createUser,
    checkUserExist,
    verifyUser,
    updateUser,
}