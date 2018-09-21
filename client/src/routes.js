import React from 'react';
import { Redirect } from 'react-router-dom';
import { makeMetaPages, makeMetaPageRouteConfigs } from 'flight-reactware';

import App from './components/App';
import Home from './pages/Home';
import Page from './components/Page';
import licenseData from './data/licenses.json';
import { metrics } from './modules';

const metaPages = makeMetaPages(Page, {
  softwareLicenses: licenseData,
});

const metaPageRouteConfigs = makeMetaPageRouteConfigs(metaPages);
const notFoundRouteConfig = {
  component: metaPages.NotFound,
};

const redirects = {
};
const redirectRoutes = Object.keys(redirects).map((k) => {
  const target = redirects[k];
  return {
    path: k,
    exact: false,
    component: ({ location }) => ( // eslint-disable-line react/prop-types
      <Redirect
        to={{
          pathname: target(location),
          search: location.search,
        }}
      />
    ),
  };
});

const routes = [
  ...redirectRoutes,
  {
    component: App,
    routes: [
      ...metaPageRouteConfigs,
      {
        path: '/metrics',
        exact: true,
        component: metrics.pages.Selection,
        title: 'Metrics',
      },
      {
        path: '/metrics/:graph',
        component: metrics.withGraphContext(),
        routes: [
          {
            path: '/metrics/:graph',
            exact: true,
            component: metrics.pages.Graph,
            title: (graph) => graph == null ? null : graph.title,
            pageKey: (graph) => graph == null ? null : graph.id,
          },
        ],
      },
      {
        path: '/compare/:graph',
        component: metrics.withGraphContext(),
        routes: [
          {
            path: '/compare/:graph',
            exact: true,
            component: metrics.pages.Compare,
            // XXX Are these correct?
            title: (graph) => graph == null ? null : graph.title,
            pageKey: (graph) => graph == null ? null : graph.id,
          },
        ],
      },
      {
        path: '/',
        exact: true,
        component: Home,
        title: 'Overview',
      },
      notFoundRouteConfig,
    ],
  },
];

export default routes;
