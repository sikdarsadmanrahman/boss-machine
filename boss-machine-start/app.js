const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
module.exports = app;

// Add middleware for handling CORS requests from index.html
app.use(cors());

// Add middleware for parsing request bodies here:
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from public directory
app.use('/public', express.static('public'));

// Mount your existing apiRouter below at the '/api' path.
const apiRouter = require('./server/api');
app.use('/api', apiRouter);

// Serve the main HTML file at the root
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

