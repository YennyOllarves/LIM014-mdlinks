const { allArrayLinks, validate } = require('./readPath.js');
const { statsList, brokenLinks } = require('./stats.js');

// const miRuta = '/home/laboratoria/LabProyectos/LIM014-mdlinks/1.md';

/* const mdLinks = (path, opts = { validate: false }) => new Promise((resolved, reject) => {
  const all = allArrayLinks(path);
  if (opts.validate === true) {
    validate(all).then(resolved);
    console.log(true);
  } else {
    resolved(all);
  } */
const mdLinks = (path, opts) => new Promise((resolved) => {
  const all = allArrayLinks(path);
  if (opts.validate === true) {
    validate(all).then(resolved);
  // console.log(true);
  } else if (
    (opts.statsList === true)) {
    statsList(all).then(resolved);
    // console.log(true);
  } else if (
    (opts.brokenLinks === true)) {
    brokenLinks(all).then(resolved);
    // console.log(true)
  } else {
    resolved(all);
  }
});

module.exports = {
  mdLinks,
};
