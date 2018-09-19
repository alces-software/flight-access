/*=============================================================================
 * Copyright (C) 2018 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Access.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import PropTypes from 'prop-types';
import React from 'react';
import { branch, compose, mapProps, renderComponent } from 'recompose';
import { Container, Row, Col } from 'reactstrap';
import { withRouter } from 'react-router';
import { Redirect, Link } from 'react-router-dom';

import * as graphs from '../data/graphs';
import { metrics } from '../data/cluster_1';
import LineChart from '../components/LineChart';
import BarChart from '../components/BarChart';

const graphTypes = {
  bar: BarChart,
  line: LineChart,
};

const GraphPage = ({ graph }) => {
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
    <Container fluid >
      <Row>
        <Col>
          <GraphComponent
            data={metrics}
            graph={graph}
          />
        </Col>
      </Row>
    </Container>
  );
};

GraphPage.propTypes = {
  graph: PropTypes.object.isRequired,
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
);

export default enhance(GraphPage);
