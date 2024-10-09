require('dotenv').config();
const express = require('express');
const morgan = require('morgan');

const route = require('./route/index.route');
const connectToDB = require('./config/db.config');

const app = express();
app.use(morgan('dev'));
app.use(express.json());

app.use('/api', route);

connectToDB()
    ? app.listen(process.env.PORT || 3000, () => {
        console.log('server started');
    })
    : console.log('Connection to DB is not established');