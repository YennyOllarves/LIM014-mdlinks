const fs = require('fs');
const path = require('path');
const marked = require('marked');
/* MIs rutas */

const miRuta = '/home/laboratoria/LabProyectos/LIM014-mdlinks';
/* const ruta = '/home/laboratoria/LabProyectos/LIM014-mdlinks/test/md-links.spec.js'; */

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

console.log('40', archivo('/home/laboratoria/LabProyectos/LIM014-mdlinks'));

function leerArchivo(route) {
  const readFile = fs.readFileSync(route).toString();
  return readFile;
}
console.log(leerArchivo('/home/laboratoria/LabProyectos/LIM014-mdlinks/README.md'));

/* EXtraccion de arrays */
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

console.log(arrayLinks('/home/laboratoria/LabProyectos/LIM014-mdlinks/1.md'));



module.exports = {
  miFuncion,
  archivo,
  leerArchivo,
};
