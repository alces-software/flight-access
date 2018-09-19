import { createSelector } from 'reselect';

import { NAME } from './constants';
import * as graphs from './data/graphs';

const metricsState = (state) => state[NAME];
const selectedGraphId = (state) => metricsState(state).selectedGraphId;

export const selectedGraph = createSelector(
  selectedGraphId,

  (id) => id == null ? null : graphs[id],
);
