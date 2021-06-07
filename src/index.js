// Create Express app
const express = require('express');
const app = express();
const path = require('path');

// Get platformFinder, downloader
const { Youtube } = require('./downloader');
const platformFinder = require('./platformFinder');

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
	try {
		let platform = platformFinder(req.body.link);
		if (!platform)
			return res.render('index.ejs', {
				textElement:
					'<p style="color: red; margin-top: 0.5rem;">Provided link must be a valid platform!</p>',
				brTag: '<br>'
			});
		switch (platform) {
			case 'youtube':
				const youtube = new Youtube(req.body.link);
				let mediaData = await youtube.getMeta();
        // { thumbnail, title, link }
        res.render("preview.ejs", {mediaData});
				break;
			case 'spotify':
				res.send('spotify');
				break;
			case 'instagram':
				res.send('instagram');
				break;
			case 'twitter':
				res.send('twitter');
		}
	} catch (e) {
    return res.send(e);
		return res.render('index.ejs', {
			textElement:
				'<p style="color: red; margin-top: 0.5rem;">Provided link must be a valid platform!</p>',
			brTag: '<br>'
		});
	}
});

app.post('/download', (req, res) =>{
  let { url, platform, format } = req.body;
  platform = platform.toLowerCase();
  format = format.toLowerCase();
  console.log(url, platform, format)
  switch(platform) {
    case "youtube":
      const youtube = new Youtube(url);
      res.header('Content-Disposition', `attachment; filename=youtube.${format}`);
      youtube.download().pipe(res);
      break;
  }
})

// Listen on port 8080
app.listen(8080);
