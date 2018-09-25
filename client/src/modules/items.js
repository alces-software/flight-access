import { ContextLink, NavItem } from 'flight-reactware';

const { makeItem } = NavItem;
const { makeLink } = ContextLink;

const currentSite = process.env.REACT_APP_SITE;

export default function({
  cluster,
  // comparison,
  graph,
  site,
}) {
  const items = [
    makeItem('Overview', 'home', makeLink(currentSite, '/overview')),
  ];
  if (site) {
    const link = makeLink(currentSite, '/');
    const item = makeItem(site.name, 'institution', link, null, site.id);
    items.push(item);
  }
  if (cluster) {
    const c = cluster;
    const link = makeLink(currentSite, `/clusters/${c.id}`);
    const item = makeItem(c.name, 'server', link, null, c.id);
    items.push(item);
  }
  if (graph) {
    const g = graph;
    const link = makeLink(currentSite, `/graphs/${g.id}`);
    const item = makeItem(g.title, 'line-chart', link, null, g.id);
    items.push(item);
  }
  // if (comparison) {
  //   const c = comparison;
  //   const link = makeLink(currentSite, `/comparisons/${c.id}`);
  //   const item = makeItem(c.title, 'lightbulb-o', link, null, c.id);
  //   items.push(item);
  // }
  return items;
}
