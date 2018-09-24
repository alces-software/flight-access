import { ContextLink, NavItem } from 'flight-reactware';

const { makeItem } = NavItem;
const { makeLink } = ContextLink;

const currentSite = process.env.REACT_APP_SITE;

export default function(selectedSite, selectedCluster, selectedGraph) {
  const items = [
    makeItem('Overview', 'home', makeLink(currentSite, '/overview')),
  ];
  if (selectedSite) {
    const site = selectedSite;
    const link = makeLink(currentSite, '/');
    const item = makeItem(site.name, 'institution', link, null, site.id);
    items.push(item);
  }
  if (selectedCluster) {
    const c = selectedCluster;
    const link = makeLink(currentSite, `/clusters/${c.id}`);
    const item = makeItem(c.name, 'server', link, null, c.id);
    items.push(item);
  }
  if (selectedCluster && selectedGraph) {
    const c = selectedCluster;
    const g = selectedGraph;
    const link = makeLink(currentSite, `/clusters/${c.id}/${g.id}`);
    const item = makeItem(g.title, 'line-chart', link, null, g.id);
    items.push(item);
  }
  return items;
}
