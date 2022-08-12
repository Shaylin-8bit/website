const fs = require('node:fs');

const getRoutes = (app) => {
    const routeDir = './routes';
    const routeFiles = fs.readdirSync(routeDir).filter(file => file.endsWith('.js'));

    for (const file of routeFiles) {
	    const route = require(`.${routeDir}/${file}`);
        app.use(`/${file.slice(0, -3)}`, route);
    }
}

module.exports = getRoutes;
