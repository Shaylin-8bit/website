const express = require("express")
const app = express()
const parser = require('./components/parser.js');

app.use(express.static('public/static'));

app.get('/', (req, res) => {
  parser('home').then(result => {
    res.send(result);
  });
});

app.get('/robots.txt', (req, res) => {
  const options = {root: './public'}
  res.sendFile('/meta/robots.txt', options);
});

app.get('/:path', (req, res) => {
  parser(req.params.path).then(result => {
    res.send(result);
  });
});

app.get('/:rss/:file', (req, res) => {
  const options = {
    root: './public'
  };
     
  res.sendFile(`${req.params.rss}/${req.params.file}`, options, err => {
    if (err) {
      console.log(err);
    }
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('500: Oh no! Something\'s gone wrong...')
});

app.listen(process.env.PORT || 3000, () => console.log('Server is running...'));
