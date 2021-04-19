/* eslint-disable no-param-reassign */
/* eslint-disable no-unreachable */
const fs = require('fs');
const path = require('path');
const marked = require('marked');
const fetch = require('node-fetch');
const { resolve } = require('path');
/* MIs rutas */

// const miRuta = '/home/laboratoria/LabProyectos/LIM014-mdlinks/1.md';

/* Funcion 1 - Verficar si existe una ruta */
function miFuncion(route) {
  if (fs.existsSync(route)) { // SI mi ruta existe
    if (path.isAbsolute(route)) { // Si mi ruta es absoluta
      return route; // Retorname la ruta
    }
    return path.resolve(route); // Sino entonces es realtiva, me la conviertes en absoluta.
  }
  return console.log('Ruta no existente'); // SI NINGUNA DE LAS 2, PUES NO EXISTE.
}

/* console.log(miFuncion(rutaRelativa)); */

// Verificar Ruta
function checkFile(miRuta) {
  // console.log('Esto deberia aparecer', miRuta);
  const fnRuta = miFuncion(miRuta); // ALMACENA EL VALOR DE LA FUNCION.
  // console.log('25', fnRuta);
  let result = [];
  if (fs.statSync(fnRuta).isDirectory() === true) {
    const listaArchivos = fs.readdirSync(fnRuta);
    listaArchivos.forEach((file) => {
      const filePath = path.join(miRuta, file);
      if (path.extname(filePath) === '.md') {
        result = result.concat(filePath);
      }
    });
  } else {
    if (path.extname(fnRuta) === '.md') {
      result.push(fnRuta);
    }
    console.log('35', fnRuta);
  }
  console.log('37', result);
  return result;
}
// console.log('40', checkFile());

// Leer archivo
const readFile = (route) => fs.readFileSync(route).toString();

// console.log(readFile('/home/laboratoria/LabProyectos/LIM014-mdlinks/README.md'));

/* EXtraccion de arrays */ // RUTA del archivo, link y text
const arrayLinks = (route) => {
  const renderer = new marked.Renderer();
  const readingFile = readFile(route); // ALMACENA EL VALOR DE LA FUNCION.
  let links = [];
  renderer.link = (href, file, text) => { // Define la salida de propiedades
    links = links.concat([{ href, text, path: route }]);
  };
  marked(readingFile, { renderer });

  return links;
};
// console.log('64', arrayLinks('/home/laboratoria/LabProyectos/LIM014-mdlinks/1.md'));

// Devuelve en un array todos los links de un archvio
const allArrayLinks = (miRuta) => {
  let allLinks = [];
  const links = checkFile(miRuta);
  links.forEach((element) => {
    allLinks = allLinks.concat(arrayLinks(element));
  //  console.log('Soy tu elemento', element);
  });
  return allLinks;
};
// console.log('74', allArrayLinks());
// Duda de porque me trae los link de todos los archivos y no de la ruta que especifico aca

// console.log('88', statsList('/home/laboratoria/LabProyectos/LIM014-mdlinks/1.md'));

const validate = (all) => {
 // const mdLinks = allArrayLinks();
  const linksVal = all.map((link) => fetch(link.href).then((res) => {
    // eslint-disable-next-line no-unused-expressions
    link.status = res.status;
    link.message = res.status === 200 ? 'OK' : 'FAIL';
    // console.log(link);
    return link;
  }).catch(() => ({
    status: 404,
    statusText: 'Fail',
  })));
  // console.log('106', linksVal);
  return Promise.all(linksVal);
};
// validate(miRuta); ==> Promise.all(linksVal);
// console.log('107', validate(miRuta));
// validate(miRuta).then((linksVal) => console.log('108', linksVal));
const statsList = (route) => {
  const allLinks = allArrayLinks(route);
  const statssList = [];
  allLinks.forEach((element) => {
    if (!statssList.includes(element.href)) statssList.push(element.href);
  });
  const all = allLinks.length;
  const unique = statssList.length;
  const result = `Total : ${all} \n Unique : ${unique}`;
  // return [`Total : ${all}`, `Unique : ${unique}`];
  return result;
};

const totalLinks = (route) => {
  const totalLinks = allArrayLinks(route);
  const list = totalLinks.map((element) => (`${element.path} ${element.href} ${element.text}`));
  return Promise.all(list);
};

const brokenLinks = (route) => {
  const linksBroken = Array.from(route).filter((element) => element.status >= 400);
  const stats = `Broken : ${linksBroken.length}`;
  return stats;
};
// console.log('96', brokenLinks('/home/laboratoria/LabProyectos/LIM014-mdlinks/1.md'));

module.exports = {
  miFuncion,
  checkFile,
  readFile,
  arrayLinks,
  allArrayLinks,
  validate,
  statsList,
  totalLinks,
  brokenLinks,
};
