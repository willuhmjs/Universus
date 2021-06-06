// Create Express app
const express = require('express');
const app = express();
const path = require('path');

// Get platformFinder, downloader
const downloader = require('./downloader');
const platformFinder = require('./platformFinder')

// Setup body-parser
const bodyParser = require('body-parser');
app.use(bodyParser());

// Setup views and public for routing
const ejs = require('ejs');
app.engine('ejs', ejs.renderFile);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Main routing
app.get('/', (req, res) => {
  res.render('index');
});

app.post('/preview', (req, res) => {
  let platform = platformFinder(req.body.link);
  // todo frontend error handling
  if (!platform) throw new Error('Invalid platform');
  switch(platform) {
    case 'youtube':
      res.send('youtube');
      break;
    case 'spotify':
      res.send('spotify');
      break;
    case 'facebook':
      res.send('facebook');
      break;
    case 'instagram':
      res.send('instagram');
      break;
    case 'twitter':
      res.send('twitter');
  }
})

// Listen on port 8080
app.listen(8080);