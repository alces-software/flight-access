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

import * as graphs from '../data/graphs';
import { metrics } from '../data/cluster_1';
import LineChart from '../components/LineChart';
import BarChart from '../components/BarChart';
import ReLineChart from '../components/ReLineChart';
import ReBarChart from '../components/ReBarChart';

const GraphPage = ({ graph }) => {
  return (
    <Container fluid >
      <Row>
        <Col>
          <LineChart
            data={metrics}
            graph={graph}
          />
        </Col>
        <Col>
          <ReLineChart
            data={metrics}
            graph={graph}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <BarChart
            data={metrics}
            graph={graph}
          />
        </Col>
        <Col>
          <ReBarChart
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
