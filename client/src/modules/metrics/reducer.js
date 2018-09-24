import {
  CLUSTER_SELECTED,
  COMPARISON_SELECTED,
  GRAPH_SELECTED,
} from './actionTypes';

import * as sites from './data/sites';

const initialState = {
  selectedGraphId: null,
  selectedClusterId: null,
  selectedSiteId: Object.keys(sites)[0],
  selectedComparrison: null,
};

function reducer(state=initialState, { type, payload }) {
  switch (type) {
    case CLUSTER_SELECTED:
      return {
        ...state,
        selectedClusterId: payload,
      };

    case COMPARISON_SELECTED:
      return {
        ...state,
        selectedComparrison: payload,
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
