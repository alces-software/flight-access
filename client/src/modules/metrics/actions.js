import * as actionTypes from './actionTypes';
import * as clusters from './data/clusters';

export function graphSelected(graphId) {
  return {
    type: actionTypes.GRAPH_SELECTED,
    payload: graphId,
  };
}

export function graphDeselected() {
  return {
    type: actionTypes.GRAPH_SELECTED,
    payload: null,
  };
}

export function clusterSelected(clusterId) {
  return {
    type: actionTypes.CLUSTER_SELECTED,
    payload: clusterId,
  };
}

export function clusterDeselected() {
  return {
    type: actionTypes.CLUSTER_SELECTED,
    payload: null,
  };
}

export function comparisonSelected(comparisonId) {
  return {
    type: actionTypes.COMPARISON_SELECTED,
    payload: {
      comparisonId: comparisonId,
      clusterIds: Object.keys(clusters),
    }
  };
}

export function comparisonDeselected() {
  return {
    type: actionTypes.COMPARISON_SELECTED,
    payload: null,
  };
}
