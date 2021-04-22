// const { allArrayLinks } = require('./readPath.js');
// Stats -- Devuelve TotalLinks y UniqueLinks
const statsList = (allLinks) => {
  // const allLinks = allArrayLinks(route);
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

/* const totalLinks = (totLinks) => {
  // const totalLinks = allArrayLinks(route);
  const list = totLinks.map((element) => (`${element.path} ${element.href} ${element.text}`));
  return (list.);
}; */

const brokenLinks = (brokLinks) => {
  const linksBroken = brokLinks.filter((element) => element.status >= 400);
  const stats = `Broken : ${linksBroken.length}`;
  return stats;
};
// console.log('96', brokenLinks('/home/laboratoria/LabProyectos/LIM014-mdlinks/1.md'));

module.exports = {
  statsList, brokenLinks,
};
