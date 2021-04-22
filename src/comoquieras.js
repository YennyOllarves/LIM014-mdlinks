// const colors = require('colors');
const { mdLinks } = require('./mdLinks');
// const { validate } = require('./readPath');
const { statsList, brokenLinks } = require('./stats');

const miRuta = '/home/laboratoria/LabProyectos/LIM014-mdlinks/1.md';
// process.argv
// commander
// yargs
// main y bin package.json
const command = process.argv.slice(2);
// console.log(command.length);
if (command[0] === '--validate' && command.length === 1) {
  mdLinks(miRuta, { validate: true })
    .then((data) => console.table(data))
    .catch((error) => console.log(error));
} else
if (command[0] === '--stats' && command.length === 1) {
  // console.log(command.length);
  mdLinks(miRuta, { validate: true })
    .then((data) => console.log('vamo a ver', statsList(data)))
    .catch((error) => console.log(error));
} else if
(command[0] === '--validate' && command[1] === '--stats') {
  // console.log(command.length);
  mdLinks(miRuta, { validate: true })
    .then((data) => console.log(statsList(data), brokenLinks(data)));
}

/* mdLinks(miRuta, { validate: true }).then((data) => {
  console.log(data);
  console.log(statsList(data));
  console.log(brokenLinks(data));
})
  .catch((error) => console.log(error)); */
