const fs = require('fs');

const routes = [];
const routeDir = './routes';

fs.readdirSync(routeDir)
  .filter(
    (file) => file.endsWith('.js')
  ).forEach(
    (file) => {
      const route = require(`.${routeDir}/${file}`);
      routes.push(route);
    }
  );

const getRoute = (path) => {
  for (let route of routes) {
    if (route.paths.includes(path)) return route;
  }
  return undefined;
}

module.exports = getRoute;
