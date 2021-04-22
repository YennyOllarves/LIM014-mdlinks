const statsList = (allLinks) => {
  const statssList = [];
  allLinks.forEach((element) => {
    if (!statssList.includes(element.href)) statssList.push(element.href);
  });
  const all = allLinks.length;
  const unique = statssList.length;
  const result = ` Total : ${all} \n Unique : ${unique}`;
  return result;
};
const brokenLinks = (brokLinks) => {
  const linksBroken = brokLinks.filter((element) => element.status >= 400);
  const stats = `Broken : ${linksBroken.length}`;
  return stats;
};
module.exports = {
  statsList, brokenLinks,
};
