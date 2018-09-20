/*=============================================================================
 * Copyright (C) 2018 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Access.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import PropTypes from 'prop-types';
import React from 'react';
import { Container } from 'reactstrap';
import { PageHeading } from 'flight-reactware';
import { Redirect, Link } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import { withSize } from 'react-sizeme';
import { branch, compose, renderComponent } from 'recompose';
// import { compose } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import * as selectors from '../selectors';
import BarChart from '../components/BarChart';
import LineChart from '../components/LineChart';

// import * as graphs from '../data/graphs';
// import * as clusters from '../data/clusters';
import * as metrics from '../data/metrics';

const graphTypes = {
  bar: BarChart,
  line: LineChart,
};

const ComparePage = ({ comparisons, size }) => {
  const overview = (
    <span>
      {/* {graph.subtitle} for {cluster.name} */}
    </span>
  );
  const title = (
    <span>
      Comparing {comparisons.length} graphs
    </span>
  );
  const graphs = comparisons.map((c, idx) => {
    const GraphComponent = graphTypes[c.graph.graphType];
    if (GraphComponent == null) {
      return (
        <Container>
          Unfortunately, we've been unable to render the selected graph.
          Please{' '}
          <Link to="/metrics">
            select another graph
          </Link>.
        </Container>
      );
    }
    return (
      <GraphComponent
        data={metrics[c.cluster.id]}
        graph={c.graph}
        key={idx}
        syncId="someId"
        width={size.width}
      />
    );
  });

  return (
    <Container>
      <PageHeading
        overview={overview}
        sections={[]}
        title={title}
      />
      {graphs}
    </Container>
  );
};

ComparePage.propTypes = {
  // cluster: PropTypes.object.isRequired,
  comparisons: PropTypes.array.isRequired,
  // graph: PropTypes.object.isRequired,
  size: PropTypes.object.isRequired,
};

ComparePage.defaultProps = {
};

const enhance = compose(
  connect(createStructuredSelector({
    comparisons: selectors.comparisons,
  //   cluster: selectors.selectedCluster,
    // graph: selectors.selectedGraph,
  //   metrics: selectors.clusterMetrics,
  })),

  branch(
    ({ comparisons }) => comparisons.length === 0,
    renderComponent(() => <Redirect to="/metrics" />),
  ),

  // withProps({
  // }),

  withSize({
    // monitorHeight: true,
    monitorWidth: true,
  }),
);

export default enhance(ComparePage);

