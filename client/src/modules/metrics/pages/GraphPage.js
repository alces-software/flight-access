/*=============================================================================
 * Copyright (C) 2018 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Access.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import PropTypes from 'prop-types';
import React from 'react';
import { compose, mapProps } from 'recompose';
import { Container, Row, Col } from 'reactstrap';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import * as graphs from '../data/graphs';
import { metrics } from '../data/cluster_1';
import LineChart from '../components/LineChart';
import BarChart from '../components/BarChart';
import ReLineChart from '../components/ReLineChart';
import ReBarChart from '../components/ReBarChart';

const graphTypes = {
  bar: BarChart,
  line: LineChart,
  rebar: ReBarChart,
  reline: ReLineChart,
};

const GraphPage = ({ graph }) => {
  if (graph == null) {
    return (
      <div>
        Graph not found
        <Link to="/metrics">Go back</Link>
      </div>
    );
  }
  const GraphComponent = graphTypes[graph.type];
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
);

export default enhance(GraphPage);
