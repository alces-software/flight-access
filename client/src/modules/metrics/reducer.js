import {
  GRAPH_SELECTED,
} from './actionTypes';

const initialState = {
  selectedGraphId: null,
};

function reducer(state=initialState, { type, payload }) {
  switch (type) {
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
