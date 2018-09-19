import { push } from 'react-router-redux';

import * as actionTypes from './actionTypes';

export function graphSelected(graph) {
  return (dispatch) => {
    const action = {
      type: actionTypes.GRAPH_SELECTED,
      payload: graph,
    };
    dispatch(action);
    dispatch(push(`/metrics/${graph.id}`));
  };
}
