import {
  CLUSTER_SELECTED,
  GRAPH_SELECTED,
} from './actionTypes';

function makeCompareData(graphId) {
  return [
    {
      clusterId: 'clusterOne',
      graphId: graphId,
    },
    {
      clusterId: 'clusterTwo',
      graphId: graphId,
    },
  ];
}

const initialState = {
  selectedGraphId: null,
  selectedClusterId: 'clusterOne',
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
