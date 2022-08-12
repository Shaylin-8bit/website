const express = require('express');
const path = require('path')

const getRoutes = require('./modules/getRoutes.js');
const getDatabase = require('./modules/getDatabase.js');

const app = express();
getDatabase(app);

app.set('view engine', 'ejs');
getRoutes(app);

app.use('/styles', express.static(path.join(__dirname, 'styles')));
app.use('/scripts', express.static(path.join(__dirname, 'scripts')));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/', (req, res, next) => {
	//console.log(req);
	next();
});

app.get('/', (req, res) => {
    res.redirect('/home');
});

app.get('*', (req, res, next) => {
	res.status(200).send('Sorry, page not found');
	next();
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server listening on ${process.env.PORT || 3000}`);
});
