const dotenv = require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');

const app = express();



const dbconfig = require("./db");
const userRoute = require("./routes/usersRoute.js");
const mailRoute = require("./routes/mailRoute.js");
const plantationRoute = require("./routes/plantationRoute.js");
const fertilizerRoute= require("./routes/fertilizerRoute.js");
// const fenceRoute = require("./routes/fenceRoute.js");

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.json());

app.use("/api/users", userRoute);
app.use("/api/mail", mailRoute);
app.use("/api/plantation", plantationRoute);
app.use("/api/fertilizer", fertilizerRoute);
// app.use("/api/fence", fenceRoute);

const port = process.env.PORT || 5000;

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
}

app.listen(port, () => console.log("Node Server Started using Nodemon!"));
