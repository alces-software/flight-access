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
        path: '/overview',
        exact: true,
        component: Home,
        title: 'Overview',
      },
      {
        path: '/',
        exact: true,
        component: metrics.pages.ClusterOverview,
        title: ({ site }) => site == null ? null : site.name,
        pageKey: ({ site }) => site == null ? null : site.id,
      },
      {
        path: '/clusters/:clusterId',
        component: metrics.withClusterContext,
        routes: [
          {
            path: '/clusters/:clusterId/access',
            exact: true,
            component: metrics.pages.Access,
            title: ({ cluster }) => cluster == null ? null : cluster.name,
            pageKey: ({ cluster }) => cluster == null ? null : cluster.id,
            key: 'hackContextEndpoint',
          },
          // {
          //   path: '/clusters/:clusterId',
          //   exact: true,
          //   component: metrics.pages.GraphSelection,
          //   title: ({ cluster }) => cluster == null ? null : cluster.name,
          //   pageKey: ({ cluster }) => cluster == null ? null : cluster.id,
          //   key: 'hackContextEndpoint',
          // },
          // {
          //   path: '/clusters/:clusterId/:graphId',
          //   component: metrics.withGraphContext,
          //   routes: [
          //     {
          //       path: '/clusters/:clusterId/:graphId',
          //       exact: true,
          //       component: metrics.pages.Graph,
          //       title: ({ graph }) => graph == null ? null : graph.title,
          //       pageKey: ({ graph }) => graph == null ? null : graph.id,
          //       key: 'hackContextEndpoint',
          //     },
          //   ],
          // },
        ]
      },
      // {
      //   path: '/comparison/:comparisonId',
      //   component: metrics.withComparisonContext,
      //   routes: [
      //     {
      //       path: '/comparison/:comparisonId',
      //       exact: true,
      //       component: metrics.pages.Comparison,
      //       title: ({ comparison }) => comparison == null ? null : comparison.title,
      //       pageKey: ({ comparison }) => comparison == null ? null : comparison.id,
      //     },
      //   ],
      // },
      {
        path: '/graph/:graphId',
        component: metrics.withGraphContext,
        routes: [
          {
            path: '/graph/:graphId',
            exact: true,
            component: metrics.pages.Comparison,
            title: ({ graph }) => graph == null ? null : graph.title,
            pageKey: ({ graph }) => graph == null ? null : graph.id,
          },
        ],
      },
      notFoundRouteConfig,
    ],
  },
];

export default routes;
