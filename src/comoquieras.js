const { mdLinks } = require('./mdLinks');

const { statsList, brokenLinks } = require('./stats');

const miRuta = '/home/laboratoria/LabProyectos/LIM014-mdlinks/1.md';

const command = process.argv.slice(2);

if (command[0] === '--validate' && command.length === 1) {
  mdLinks(miRuta, { validate: true })
    .then((data) => console.table(data))
    .catch((error) => console.log(error));
} else
if (command[0] === '--stats' && command.length === 1) {
  mdLinks(miRuta, { validate: true })
    .then((data) => console.log('vamo a ver', statsList(data)))
    .catch((error) => console.log(error));
} else if
(command[0] === '--validate' && command[1] === '--stats') {
  mdLinks(miRuta, { validate: true })
    .then((data) => console.log(`${statsList(data)} \n ${brokenLinks(data)}`));
}
