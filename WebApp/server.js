const dotenv = require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();

const dbconfig = require('./db');
const userRoute = require('./routes/usersRoute.js');
const mailRoute = require('./routes/mailRoute.js');
const MapTemplateRoute = require('./routes/mapTemplateRoute.js');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.json());

app.use('/api/users', userRoute);
app.use('/api/mail', mailRoute);
app.use('/api/mapTemplate', MapTemplateRoute);

const port = process.env.PORT || 5000;

if (process.env.NODE_ENV == 'production') {
  app.use(express.static('client/build'));
}

app.listen(port, () => console.log('Node Server Started using Nodemon!'));
