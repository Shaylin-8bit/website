const startServer = async function() {
	console.log('Fetching dependencies...');
	const express      = require('express');
	const path         = require('path')
	const cookieParser = require('cookie-parser');
	const session 	   = require('express-session');

	console.log('Fetching modules...');
	const getRoutes   = require('./modules/getRoutes.js');
	const getDatabase = require('./modules/getDatabase.js');
	const getConfig   = require('./modules/getConfig.js');

	console.log('Building app...');
	const app = express();
	getConfig(app);
	getDatabase(app);
	//await app.database.clear();
	await app.database.check();
	
    app.use(express.urlencoded({ extended: false }));
	app.use(cookieParser());

	app.use(session({
		secret: process.env.SESSION_TOKEN,
		name: 'uniqueSessionID',
		saveUninitialized: false,
		cookie: {maxAge: 1000*60*60},
		resave: false
	}));
	
	app.set('view engine', 'ejs');

	console.log('Setting middleware...');
	app.use(express.urlencoded({extended:false}))
	app.use('/', (req, res, next) => {
		const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
		console.log(`${ip.split(':')[3]} requested ${req.method}: ${req.path}`);
		req.app = app;
		next();
	});

	console.log('Setting static files...');
	app.use('/styles',  express.static(path.join(__dirname, 'static/styles' )));
	app.use('/scripts', express.static(path.join(__dirname, 'static/scripts')));
	app.use('/images',  express.static(path.join(__dirname, 'static/images' )));
    
	getRoutes(app);

	console.log('Setting top level routes...');
	app.get('/', (req, res) => res.redirect('/home'));
	app.get('*', (req, res, next) => {
		res.status(200).render('404');
		next();
	});
    
	console.log('Starting server...')
	app.listen(process.env.PORT || 3000, () => {
		console.log(`\nServer listening on port ${process.env.PORT || 3000}!`);
	});

}

startServer();
