const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDBSession = require('connect-mongodb-session')(session);
const path = require('path');

const app = express();

// Middleware for parsing requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files (e.g., CSS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Set up view engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// MongoDB Session Store
const store = new MongoDBSession({
  uri: 'mongodb://localhost:27017/jordanShipping',
  collection: 'sessions',
});

// Session Config
app.use(
  session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

// Routes for authentication and shipment management
const authRoutes = require('./routes/auth');
const shipmentRoutes = require('./routes/shipment');
app.use(authRoutes);
app.use(shipmentRoutes);

// MongoDB Connection
mongoose
  .connect('mongodb://localhost:27017/jordanShipping')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(3000, () => console.log('Server running on port 3000'));
  })
  .catch((err) => console.log(err));
