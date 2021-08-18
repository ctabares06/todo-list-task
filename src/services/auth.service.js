const BasicStrategy = require("passport-http").BasicStrategy;
const { checkUserExist } = require("../repos/user.repository");
const { verifyUser } = require("./user.service");

const verifyToken =
    new BasicStrategy((username, password, done) =>
      checkUserExist(username, username)
        .then((response) => {
          if (response.length === 0) {
            throw new Error("User does not exist");
          }
          const [user] = response;
          const isCorrectPassword = verifyUser(password, user.salt, user.password);
          if (!isCorrectPassword) {
            throw new Error("wrong password");
          }
          
          return done(null, user);
        })
        .catch((err) => done(null, false, err)));

module.exports = {
  verifyToken,
};
