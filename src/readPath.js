const fs = require('fs');
const path = require('path');
/* MIs rutas */

const miRuta = '/home/laboratoria/LabProyectos/LIM014-mdlinks';
/* const ruta = '/home/laboratoria/LabProyectos/LIM014-mdlinks/test/md-links.spec.js'; */

/* const miRuta = './index.js';

/* Verficar si existe una ruta */
function miFuncion(route) {
  if (fs.existsSync(route)) {
    if (path.isAbsolute(route)) {
      return route;
    }
    return path.resolve(route);
  }
  return console.log('Ruta no existente');
}

/* console.log(miFuncion(rutaRelativa)); */

function archivo() {
  const fnRuta = miFuncion(miRuta); // ALMACENA EL VALOR DE LA FUNCION.
  console.log(fnRuta);
  let result = [];
  if (fs.statSync(fnRuta).isDirectory() === true) {
    const listaArchivos = fs.readdirSync(fnRuta);
    listaArchivos.forEach((file) => {
      if (path.extname(file) === '.md') {
        result = result.concat(file);
      }
    });
  } else {
    return result;
  }
  return result;
}

console.log(archivo());

module.exports = {
  miFuncion,
  archivo,
};
