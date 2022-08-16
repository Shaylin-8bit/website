const fs = require('node:fs');

const getRoutes = (app) => {
    console.log('Getting routes...');
    const routeDir = './routes';
    const routeFiles = fs.readdirSync(routeDir).filter(file => file.endsWith('.js'));

    for (const file of routeFiles) {
	    const route = require(`.${routeDir}/${file}`);
        app.use(`/${file.slice(0, -3)}`, route);
    }
}

module.exports = getRoutes;
