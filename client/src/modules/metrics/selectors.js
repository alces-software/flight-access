import { createSelector } from 'reselect';

import * as clusters from './data/clusters';
import * as comparisons from './data/comparisons';
import * as graphs from './data/graphs';
import * as sites from './data/sites';
import metrics from './data/metrics.json';
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

function clusterId(state, params) {
  if (params.cluster) {
    return params.cluster.id;
  } else if (params.clusterId) {
    return params.clusterId;
  } else {
    return selectedClusterId(state);
  }
}

export const clusterMetrics = createSelector(
  clusterId,
  (state, props) => props.timeframe || 'day',

  (id, timeframe) => {
    if (id == null) { return null; }
    const cm = metrics[id];
    switch (timeframe) {
      case '28days':
        return cm.slice(cm.length - ( 24 * 28 ));

      case 'fortnight':
        return cm.slice(cm.length - ( 24 * 14 ));

      case 'week':
        return cm.slice(cm.length - ( 24 * 7 ));

      case 'day':
      default:
        return cm.slice(cm.length - 24);
        // eslint-disable-next-line no-unreachable
    };
  },
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
