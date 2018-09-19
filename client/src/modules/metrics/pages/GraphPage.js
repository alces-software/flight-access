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
import { withSize } from 'react-sizeme';
import { branch, compose, mapProps, renderComponent } from 'recompose';
import { withRouter } from 'react-router';

import * as graphs from '../data/graphs';
import { metrics } from '../data/cluster_1';
import LineChart from '../components/LineChart';
import BarChart from '../components/BarChart';

const graphTypes = {
  bar: BarChart,
  line: LineChart,
};

const GraphPage = ({ graph, size }) => {
  const GraphComponent = graphTypes[graph.graphType];
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
    <Container>
      <PageHeading
        overview={graph.subtitle}
        sections={[]}
        title={graph.title}
      />
      <GraphComponent
        data={metrics}
        graph={graph}
        width={size.width}
      />
    </Container>
  );
};

GraphPage.propTypes = {
  graph: PropTypes.object.isRequired,
  size: PropTypes.object.isRequired,
};

GraphPage.defaultProps = {
};

const enhance = compose(
  withRouter,

  mapProps(({ match }) => {
    const graphId = match.params.graph;
    return {
      graph: graphs[graphId],
    };
  }),

  branch(
    ({ graph }) => graph == null,
    renderComponent(() => <Redirect to="/metrics" />),
  ),

  withSize({
    // monitorHeight: true,
    monitorWidth: true,
  }),
);

export default enhance(GraphPage);
