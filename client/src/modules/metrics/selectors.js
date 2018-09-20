import { createSelector } from 'reselect';

import { NAME } from './constants';
import * as graphs from './data/graphs';
import * as clusters from './data/clusters';
import * as metrics from './data/metrics';

const metricsState = (state) => state[NAME];
const compareData = (state) => metricsState(state).compare;
const selectedGraphId = (state) => metricsState(state).selectedGraphId;
const selectedClusterId = (state) => metricsState(state).selectedClusterId;

export const selectedGraph = createSelector(
  selectedGraphId,

  (id) => id == null ? null : graphs[id],
);

export const selectedCluster = createSelector(
  selectedClusterId,

  (id) => id == null ? null : clusters[id],
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
