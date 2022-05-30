const routes = require('./routes.js');
const fs = require('fs');

const parse = async (path) => {
  result = '<!DOCTYPE html>\n'
  const route = routes(path);
  if (route) {
    
    for (let i of route.files) {
      try {
        result += fs.readFileSync(`./public/html/${i}`, {encoding:'utf8', flag:'r'});
      } catch (err) {
        if (err.code === 'ENOENT') {
          return '<h1> 404: File Not Found </h1>';
        } else {
          return '<h1> 500: Server Error </h1>';
        }
      }
    }
    return result;
    
  } else {
    return '<h1> 404: File Not Found </h1>';
  }
};

module.exports = parse;
