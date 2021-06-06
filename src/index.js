// Create Express app
const express = require('express');
const app = express();
const path = require('path');

// Get validator
const Validator = require('./validator')

// Setup body-parser
const bodyParser = require('body-parser');
app.use(bodyParser());

// Setup EJS
const ejs = require('ejs');
app.engine('ejs', ejs.renderFile);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Main routing
app.get('/', (req, res) => {
  res.render('index');
});

app.post('/preview', (req, res) => {
  console.log(req.body.url);
  const validator = new Validator(req.body.url).getPlatform();
})

// Listen on port 8080
app.listen(8080);