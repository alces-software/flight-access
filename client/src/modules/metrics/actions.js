import * as actionTypes from './actionTypes';

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
