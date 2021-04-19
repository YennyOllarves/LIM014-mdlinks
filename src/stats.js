const { allArrayLinks } = require('./readPath.js');
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
  statsList, brokenLinks, totalLinks,
};
