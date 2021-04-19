const { mdLinks } = require('./mdLinks');
const {
  validate, statsList, totalLinks, brokenLinks,
} = require('./readPath');

const miRuta = '/home/laboratoria/LabProyectos/LIM014-mdlinks/1.md';

mdLinks(miRuta, { validate: true }).then((data) => console.log('este es de data', data))
  .catch((error) => console.log(error));

mdLinks(miRuta, { statsList: true }).then((data) => console.log('prueba', data)).catch((error) => console.log(error));
