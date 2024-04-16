const dotenv = require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const middleware = require("./middleware/middleware");
const app = express();
const fenceRoute = require("./routes/fenceRoute.js");
const polylineRoute = require("./routes/map.js");
const dbconfig = require('./db');
const userRoute = require('./routes/usersRoute.js');
const mailRoute = require('./routes/mailRoute.js');
const MapTemplateRoute = require('./routes/MapTemplateRoute.js');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.json());

app.use("/api/auth/*", middleware);
app.use("/api/users", userRoute);
app.use("/api/mail", mailRoute);
app.use("/api", fenceRoute);
app.use("/api/auth/polyline",polylineRoute);
app.use('/api/auth/mapTemplate', MapTemplateRoute);

const port = process.env.PORT || 5000;

if (process.env.NODE_ENV == 'production') {
  app.use(express.static('client/build'));
}

app.listen(port, () => console.log('Node Server Started using Nodemon!'));
