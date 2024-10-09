const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.get('/', (req, res) => {
    res.send('API is running.');
});

app.use('/content', express.static(path.join(__dirname, 'content')));

function buildFullUrl(req, relativePath) {
    return `${req.protocol}://${req.get('host')}/content${relativePath}`;
  }


app.get('/api/content/about', (req, res) => {
    const aboutData = require('./content/about.json');
    

    aboutData.profile.image = buildFullUrl(req, aboutData.profile.image);
    
    res.json(aboutData);
  });


app.get('/api/content/bookmarks', (req, res) => {
    res.sendFile(path.join(__dirname, 'content/bookmarks.json'));
});


app.get('/api/content/colophon', (req, res) => {
    res.sendFile(path.join(__dirname, 'content/colophon.json'));
});

app.get('/api/content/gallery', (req, res) => {
    res.sendFile(path.join(__dirname, 'content/gallery.json'));
});

app.get('/api/content/hireme', (req, res) => {
    res.sendFile(path.join(__dirname, 'content/hireme.json'));
});

app.get('/api/content/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'content/notes.json'));
});

app.get('/api/content/now', (req, res) => {
    res.sendFile(path.join(__dirname, 'content/now.json'));
});

app.get('/api/content/projects', (req, res) => {
    res.sendFile(path.join(__dirname, 'content/projects.json'));
});

app.get('/api/content/social-media', (req, res) => {
    res.sendFile(path.join(__dirname, 'content/social-media.json'));
});

app.get('/api/content/status', (req, res) => {
    res.sendFile(path.join(__dirname, 'content/status.json'));
});


app.get('/api/content/story', (req, res) => {
    const storyData = require('./content/story.json');
    

    storyData.forEach(story => {
      if (story.thumbUrl) {
        story.thumbUrl = buildFullUrl(req, story.thumbUrl);
      }
      if (story.imageUrl) {
        story.imageUrl = buildFullUrl(req, story.imageUrl);
      }
    });
    
    res.json(storyData);
  });

app.get('/api/content/support', (req, res) => {
    res.sendFile(path.join(__dirname, 'content/support.json'));
});

app.get('/api/content/timeline', (req, res) => {
    res.sendFile(path.join(__dirname, 'content/timeline.json'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
