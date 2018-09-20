import {
  CLUSTER_SELECTED,
  GRAPH_SELECTED,
} from './actionTypes';

const initialState = {
  selectedGraphId: null,
  selectedClusterId: 'clusterOne',
};

function reducer(state=initialState, { type, payload }) {
  switch (type) {
    case CLUSTER_SELECTED:
      return {
        ...state,
        selectedClusterId: payload,
      };

    case GRAPH_SELECTED:
      return {
        ...state,
        selectedGraphId: payload,
      };

    default:
      return state;
  }
}

export default reducer;
