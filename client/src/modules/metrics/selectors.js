import { createSelector } from 'reselect';

import * as clusters from './data/clusters';
// import * as comparisons from './data/comparisons';
import * as graphs from './data/graphs';
import * as sites from './data/sites';
import metrics from './data/metrics.json';
import { NAME } from './constants';

const metricsState = (state) => state[NAME];
// const comparisonData = (state) => metricsState(state).selectedComparrison;
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

export function timeframe(state, params) {
  return params.timeframe || metricsState(state).timeframe;
}

function parsedTimeframe(state, params) {
  const [ amount, unit ] = timeframe(state, params).split(/ +/);
  return { amount, unit };
}

export const clusterMetrics = createSelector(
  clusterId,
  parsedTimeframe,

  (id, { amount, unit }) => {
    if (id == null) { return null; }
    const cm = metrics[id];
    switch (unit) {
      case 'hour':
      case 'hours':
        return cm.slice(cm.length - amount);

      case 'day':
      case 'days':
        return cm.slice(cm.length - ( 24 * amount ));

      case 'week':
      case 'weeks':
        return cm.slice(cm.length - ( 24 * 7 * amount ));

      default:
        // One days worth of data.
        return cm.slice(cm.length - 24);
        // eslint-disable-next-line no-unreachable
    };
  },
);

export const yAxisDomain = createSelector(
  (state, params) => params.graph || selectedGraph(state),

  (graph) => {
    const fields = graph.chartSeries.map(s => s.field);
    const field = fields[0];
    let flattenedMetrics = [];
    Object.keys(metrics).forEach((clusterId) => {
      flattenedMetrics = [
        ...flattenedMetrics,
        ...metrics[clusterId].map(m => m[field]),
      ];
    });
    return [
      Math.min.apply(null, flattenedMetrics),
      Math.max.apply(null, flattenedMetrics),
    ];
  },
);

// export const selectedComparrison = createSelector(
//   comparisonData,

//   (data) => {
//     if (data == null) { return data; }
//     return graphs[data.comparisonId];
//   }
// );

// XXX Rename this.  It is too similarly named and yet to different to
// selectedComparrison above.
export const selectedComparrisons = createSelector(
  selectedGraph,

  (graph) => {
    if (graph == null) { return graph; }
    return Object.keys(clusters).map((clusterId) => {
      return {
        cluster: clusters[clusterId],
        graph: graph,
      };
    });
  },
);
