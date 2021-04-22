/* eslint-disable no-param-reassign */
/* eslint-disable no-unreachable */
const fs = require('fs');
const path = require('path');
const marked = require('marked');
const fetch = require('node-fetch');

/* Funcion 1 - Verficar si existe una ruta */
function miFuncion(route) {
  if (fs.existsSync(route)) { // SI mi ruta existe
    if (path.isAbsolute(route)) { // Si mi ruta es absoluta
      return route; // Retorname la ruta
    }
    return path.resolve(route); // Sino entonces es realtiva, me la conviertes en absoluta.
  }
  return ('Ruta no existente'); // SI NINGUNA DE LAS 2, PUES NO EXISTE.
}
// Verificar Ruta
function checkFile(miRuta) {
  const fnRuta = miFuncion(miRuta); // ALMACENA EL VALOR DE LA FUNCION.
  let result = [];
  if (fs.statSync(fnRuta).isDirectory() === true) {
    const listaArchivos = fs.readdirSync(fnRuta);
    listaArchivos.forEach((file) => {
      const filePath = path.join(miRuta, file);
      if (path.extname(filePath) === '.md') {
        result = result.concat(filePath);
      }
    });
  } else if (path.extname(fnRuta) === '.md') {
    result.push(fnRuta);
  }
  return result;
}
// Leer archivo
const readFile = (route) => fs.readFileSync(route).toString();
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
// Devuelve en un array todos los links de un archvio
const allArrayLinks = (miRuta) => {
  let allLinks = [];
  const links = checkFile(miRuta);
  links.forEach((element) => {
    allLinks = allLinks.concat(arrayLinks(element));
  });
  return allLinks;
};
const validate = (all) => {
  const linksVal = all.map((link) => fetch(link.href).then((response) => {
    // eslint-disable-next-line no-unused-expressions
    link.status = response.status;
    link.message = response.status === 200 ? 'OK' : 'FAIL';
    return link;
  }).catch(() => ({
    status: 404,
    message: 'Fail',
  })));
  return Promise.all(linksVal);
};

module.exports = {
  miFuncion,
  checkFile,
  readFile,
  arrayLinks,
  allArrayLinks,
  validate,
};
