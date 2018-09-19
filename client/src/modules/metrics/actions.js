import * as actionTypes from './actionTypes';

export function graphSelected(graphId) {
  return {
    type: actionTypes.GRAPH_SELECTED,
    payload: graphId,
  };
}
