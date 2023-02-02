const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const medicinesRouter = require('./routes/medicines/medicines.router');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/medicines', medicinesRouter);

module.exports = app;