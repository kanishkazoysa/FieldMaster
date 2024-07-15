require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const middleware = require('./middleware/middleware');
const app = express();

const dbconfig = require('./db');
const userRoute = require('./routes/usersRoute.js');
const mailRoute = require('./routes/mailRoute.js');
const contactRoute = require('./routes/contactRoute.js');
const plantationRoute = require('./routes/plantationRoute.js');
const fertilizerRoute= require('./routes/fertilizerRoute.js');
const fenceRoute = require('./routes/fenceRoute.js');
const clearLandRoute = require('./routes/clearLandRoute.js');
const MapTemplateRoute = require('./routes/MapTemplateRoute.js');
const InputControlRoute = require('./routes/InputControlRoute.js');

const allowedOrigins = ['https://field-master-frontend.vercel.app', 'http://localhost:3000'];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // Add this line
}));

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/api/auth/*', middleware);
app.use('/api/users', userRoute);
app.use('/api/mail', mailRoute);
app.use('/api/contact', contactRoute); 
app.use('/api/plantation', plantationRoute);
app.use('/api/fertilizer', fertilizerRoute);
app.use('/api/fence', fenceRoute);
app.use('/api/clearLand', clearLandRoute);
app.use('/api/auth/mapTemplate', MapTemplateRoute);
app.use('/api/auth/inputControl', InputControlRoute);

const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Server running on port ${port}`));
