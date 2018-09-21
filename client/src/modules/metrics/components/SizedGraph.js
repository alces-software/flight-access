/*=============================================================================
 * Copyright (C) 2018 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Access.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { MissingNotice } from 'flight-reactware';
import { compose } from 'recompose';
import { withSize } from 'react-sizeme';

import BarChart from '../components/BarChart';
import BubbleChart from '../components/BubbleChart';
import LineChart from '../components/LineChart';

const graphTypes = {
  bar: BarChart,
  bubble: BubbleChart,
  line: LineChart,
};

const GraphWrapper = ({ graph, metrics, size, syncId, title }) => {
  const GraphComponent = graphTypes[graph.graphType];
  if (GraphComponent == null) {
    return (
      <MissingNotice title="Unable to render graph" >
        <p>
          Unfortunately, we've been unable to render the selected graph.
          Please{' '}
          <Link to="/metrics">
            select another graph
          </Link>.
        </p>
      </MissingNotice>
    );
  }

  return (
    <div>
      { title == null ? null : <h4>{title}</h4> }
      <GraphComponent
        data={metrics}
        graph={graph}
        syncId={syncId}
        width={size.width}
      />
    </div>
  );
};

GraphWrapper.propTypes = {
  graph: PropTypes.object.isRequired,
  metrics: PropTypes.array.isRequired,
  size: PropTypes.shape({
    width: PropTypes.number.isRequired,
  }).isRequired,
  syncId: PropTypes.string,
  title: PropTypes.node,
};

const enhance = compose(
  withSize({
    monitorWidth: true,
    refreshMode: "debounce",
  }),
);

export default enhance(GraphWrapper);
