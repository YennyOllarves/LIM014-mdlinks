const fs = require('fs');
const path = require('path');
const marked = require('marked');
/* MIs rutas */

/* const miRuta = './index.js';

/* Verficar si existe una ruta */
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

function archivo() {
  const fnRuta = miFuncion(miRuta); // ALMACENA EL VALOR DE LA FUNCION.
  console.log('25', fnRuta);
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
    console.log('35', result);
  }
  console.log('37', result);
  return result;
}

// console.log('40', archivo('/home/laboratoria/LabProyectos/LIM014-mdlinks'));

function leerArchivo(route) {
  const readFile = fs.readFileSync(route).toString();
  return readFile;
}
// console.log(leerArchivo('/home/laboratoria/LabProyectos/LIM014-mdlinks/README.md'));

/* EXtraccion de arrays */ // RUTA del archivo, link y text
const arrayLinks = (route) => {
  const renderer = new marked.Renderer();
  const readingFile = leerArchivo(route); // ALMACENA EL VALOR DE LA FUNCION.
  let links = [];
  renderer.link = (href, file, text) => { // Define la salida de propiedades
    links = links.concat([{ href, text, path: route }]);
  };
  marked(readingFile, { renderer });

  return links;
};

// console.log('64', arrayLinks('/home/laboratoria/LabProyectos/LIM014-mdlinks/1.md'));

// Devuelve todos los links de un archvio
const allArrayLinks = (route) => {
  let allLinks = [];
  const links = archivo(route);
  links.forEach(() => {
    allLinks = allLinks.concat(arrayLinks(route));
  });
  return allLinks;
};
// console.log('74', allArrayLinks('/home/laboratoria/LabProyectos/LIM014-mdlinks/1.md')); // Duda de porque me trae los link de todos los archivos y no de la ruta que especifico aca

// Stats -- Devuelve TotalLinks y UniqueLinks
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

// console.log('88', statsList('/home/laboratoria/LabProyectos/LIM014-mdlinks/1.md'));

const brokenLinks = (route) => {
  const linksBroken = Array.from(route).filter((element) => element.status >= 400);
  const stats = `Broken : ${linksBroken.length}`;
  return stats;
};
// console.log('96', brokenLinks('/home/laboratoria/LabProyectos/LIM014-mdlinks/1.md'));

module.exports = {
  miFuncion,
  archivo,
  leerArchivo,
  arrayLinks,
};
