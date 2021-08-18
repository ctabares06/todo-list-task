require('dotenv').config();
const express = require('express');
const passport = require('passport');
const morgan = require('morgan');
const router = require('./src/routes/index');
const { verifyToken } = require('./src/services/auth.service');
const app = express();

passport.use(verifyToken);

app.use(morgan('short'));
app.use(router);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

app.listen(process.env.PORT, () => {
    console.log(`Server runing at port ${process.env.PORT}`);
});