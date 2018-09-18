import { ContextLink, NavItem } from 'flight-reactware';

const { makeItem } = NavItem;
const { makeLink } = ContextLink;

const currentSite = process.env.REACT_APP_SITE;

export default function() {
  return [
    makeItem('Overview', 'home', makeLink(currentSite, '/')),
    makeItem('Access', 'briefcase', makeLink(currentSite, '/access')),
  ];
}
