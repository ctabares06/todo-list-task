require('dotenv').config();
const express = require('express');
const router = require('./src/routes/index');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);

app.listen(process.env.PORT, () => {
    console.log(`Server runing at port ${process.env.PORT}`);
}); 