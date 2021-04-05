const mdLinks = require('../src/readPath.js');

describe('Comprobar que la funcion miFuncion funciona', () => {
  it('is a function', () => {
    expect(typeof mdLinks.miFuncion).toBe('function');
  });
  it('returns pathAbsolute', () => {
    expect(mdLinks.miFuncion('/home/laboratoria/LabProyectos/LIM014-mdlinks')).toEqual('/home/laboratoria/LabProyectos/LIM014-mdlinks');
  });
  it('returns NO existe', () => {
    expect(mdLinks.miFuncion('/home/laboratoria/LabProyectos/LIM014-mdlinks.noexiste.js')).toEqual(undefined);
  });
  it('returns Resolve Relativa', () => {
    expect(mdLinks.miFuncion('src')).toEqual('/home/laboratoria/LabProyectos/LIM014-mdlinks/src');
  });
});
describe('Comprobar que la funcion archivo funciona', () => {
  it('is a function', () => {
    expect(typeof mdLinks.archivo).toBe('function');
  });
  it('Muestra las extesionex .md', () => {
    expect(mdLinks.archivo('/home/laboratoria/LabProyectos/LIM014-mdlinks')).toEqual(['1.md', 'README.md']);
  });
  it('Verificar si es un directorio', () => { // PREGUNTAR SOBRE ESTEEEEE TEST QUE NO ME FUNCIONA.
    expect(mdLinks.archivo('/home/laboratoria/LabProyectos/LIM014-mdlinks/src/index.js')).toStrictEqual(['1.md', 'README.md']);
  });
});
