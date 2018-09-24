import {
  CLUSTER_SELECTED,
  GRAPH_SELECTED,
} from './actionTypes';

import * as sites from './data/sites';

function makeCompareData(graphId) {
  return [
    {
      clusterId: 'demo',
      graphId: graphId,
    },
    {
      clusterId: 'pres',
      graphId: graphId,
    },
  ];
}

const initialState = {
  selectedGraphId: null,
  selectedClusterId: null,
  selectedSiteId: Object.keys(sites)[0],
  compare: [],
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
        compare: makeCompareData(payload),
      };

    default:
      return state;
  }
}

export default reducer;
