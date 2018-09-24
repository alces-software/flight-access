import { createSelector } from 'reselect';

import * as clusters from './data/clusters';
import * as graphs from './data/graphs';
import * as metrics from './data/metrics';
import * as sites from './data/sites';
import { NAME } from './constants';

const metricsState = (state) => state[NAME];
const compareData = (state) => metricsState(state).compare;
const selectedClusterId = (state) => metricsState(state).selectedClusterId;
const selectedGraphId = (state) => metricsState(state).selectedGraphId;
const selectedSiteId = (state) => metricsState(state).selectedSiteId;

export const selectedGraph = createSelector(
  selectedGraphId,

  (id) => id == null ? null : graphs[id],
);

export const selectedCluster = createSelector(
  selectedClusterId,

  (id) => id == null ? null : clusters[id],
);

export const selectedSite = createSelector(
  selectedSiteId,

  (id) => id == null ? null : sites[id],
);

export const clusterMetrics = createSelector(
  selectedClusterId,

  (id) => id == null ? null : metrics[id],
);

export const comparisons = createSelector(
  compareData,

  (data) => {
    return data.map(({ clusterId, graphId }) => {
      return {
        cluster: clusters[clusterId],
        graph: graphs[graphId],
      };
    });
  },
);
