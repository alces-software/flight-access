import {
  GRAPH_SELECTED,
} from './actionTypes';

const initialState = {
  selectedGraph: null,
};

function reducer(state=initialState, { type, payload }) {
  switch (type) {
    case GRAPH_SELECTED:
      return {
        ...state,
        selectedGraph: payload,
      };

    default:
      return state;
  }
}

export default reducer;
