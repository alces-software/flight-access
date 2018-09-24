import { createSelector } from 'reselect';

import * as clusters from './data/clusters';
import * as comparisons from './data/comparisons';
import * as graphs from './data/graphs';
import * as metrics from './data/metrics';
import * as sites from './data/sites';
import { NAME } from './constants';

const metricsState = (state) => state[NAME];
const comparisonData = (state) => metricsState(state).selectedComparrison;
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

export const selectedComparrison = createSelector(
  comparisonData,

  (data) => {
    if (data == null) { return data; }
    return comparisons[data.comparisonId];
  }
);

// XXX Rename this.  It is too similarly named and yet to different to
// selectedComparrison above.
export const selectedComparrisons = createSelector(
  comparisonData,

  (data) => {
    if (data == null) { return data; }
    return data.clusterIds.map((clusterId) => {
      return {
        cluster: clusters[clusterId],
        graph: comparisons[data.comparisonId],
      };
    });
  },
);
