import { createSelector } from 'reselect';

import { NAME } from './constants';

const metricsState = (state) => state[NAME];

export const selectedGraph = createSelector(
  metricsState,

  (s) => s.selectedGraph,
);
