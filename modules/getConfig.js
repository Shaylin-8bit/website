const getConfig = (app) => {
    console.log('Getting configuration...');
    app.config = require('../config.json');
}

module.exports = getConfig;
