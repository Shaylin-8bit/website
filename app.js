const startServer = async function() {
	console.log('Fetching dependencies...');
	const express = require('express');
	const path = require('path')

	console.log('Fetching modules...');
	const getRoutes = require('./modules/getRoutes.js');
	const getDatabase = require('./modules/getDatabase.js');
	const getConfig = require('./modules/getConfig.js');

	console.log('Building app...');
	const app = express();
	getConfig(app);
	getDatabase(app);
	await app.database.check();
	getRoutes(app);
	
	
	app.set('view engine', 'ejs');

	console.log('Setting logs...');
	app.use('/', (req, res, next) => {
		console.log(req);
		next();
	});

	console.log('Setting static files...');
	app.use('/styles',  express.static(path.join(__dirname, 'static/styles' )));
	app.use('/scripts', express.static(path.join(__dirname, 'static/scripts')));
	app.use('/images',  express.static(path.join(__dirname, 'static/images' )));
    
	console.log('Setting top level routes...');
	app.get('/', (req, res) => res.redirect('/home'));
	app.get('*', (req, res, next) => {
		res.status(200).send('Sorry, page not found');
		next();
	});
    
	console.log('Starting server...')
	app.listen(process.env.PORT || 3000, () => {
		console.log(`\nServer listening on port ${process.env.PORT || 3000}!`);
	});

}

startServer();
