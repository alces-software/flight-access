import { ContextLink, NavItem } from 'flight-reactware';

const { makeItem } = NavItem;
const { makeLink } = ContextLink;

const currentSite = process.env.REACT_APP_SITE;

export default function(selectedGraph) {
  const items = [
    makeItem('Overview', 'home', makeLink(currentSite, '/')),
    makeItem('Metrics', 'area-chart', makeLink(currentSite, '/metrics')),
  ];
  if (selectedGraph) {
    const g = selectedGraph;
    const link = makeLink(currentSite, `/metrics/${g.id}`);
    const item = makeItem(g.title, 'line-chart', link, null, g.id);
    items.push(item);
  }
  return items;
}
