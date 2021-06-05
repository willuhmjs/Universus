// Create Express app
const express = require('express');
const app = express();
const path = require('path');

// Setup EJS
const ejs = require('ejs');
app.engine('ejs', ejs.renderFile);
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

// Main routing
app.get('/', (req, res) => {
  res.render('index');
});

// Listen on port 8080
app.listen(8080);