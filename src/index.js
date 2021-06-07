// Create Express app
const express = require('express');
const app = express();
const path = require('path');

// Get downloader
const { Youtube } = require('./downloader');

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
	res.render('index', { textElement: '', brTag: '' });
});

app.post('/preview', async (req, res) => {
	const youtube = new Youtube(req.body.link);
  let isValid = youtube.validateURL(req.body.link);
  if (!isValid) return res.render('index.ejs', {
			textElement:
				'<p style="color: red; margin-top: 0.5rem;">Provided link must be a valid YouTube link!</p>',
			brTag: '<br>'
		});
	let mediaData = await youtube.getMeta();
  // { thumbnail, title, link }
  res.render("preview.ejs", {mediaData});
});

app.post('/download', (req, res) =>{
  let { url, format } = req.body;
  format = format.toLowerCase();
  const youtube = new Youtube(url);
  res.header('Content-Disposition', `attachment; filename=youtube.${format}`);
  youtube.download().pipe(res);
})

// Listen on port 8080
app.listen(8080);
