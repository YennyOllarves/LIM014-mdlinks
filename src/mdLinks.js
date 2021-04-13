const { arrayLinks } = require('./readPath.js');

const mdLinks = (path, opts = { validate: false }) => new Promise((resolve, reject) => {
  resolve(arrayLinks(path));
});

module.exports = {
  mdLinks,
};
