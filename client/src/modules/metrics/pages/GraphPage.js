/*=============================================================================
 * Copyright (C) 2018 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Access.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import React from 'react';
import { compose } from 'recompose';
import { Container, Row, Col } from 'reactstrap';

import { loadOneGraph, loadFiveGraph, metrics } from '../data/cluster_1';
import LineChart from '../components/LineChart';
import BarChart from '../components/BarChart';
import ReLineChart from '../components/ReLineChart';
import ReBarChart from '../components/ReBarChart';

const GraphPage = () => {
  return (
    <Container fluid >
      <Row>
        <Col>
          <LineChart
            data={metrics}
            graph={loadOneGraph}
          />
        </Col>
        <Col>
          <ReLineChart
            data={metrics}
            graph={loadOneGraph}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <LineChart
            data={metrics}
            graph={loadFiveGraph}
          />
        </Col>
        <Col>
          <ReLineChart
            data={metrics}
            graph={loadFiveGraph}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <BarChart
            data={metrics}
            graph={loadOneGraph}
          />
        </Col>
        <Col>
          <ReBarChart
            data={metrics}
            graph={loadOneGraph}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <BarChart
            data={metrics}
            graph={loadFiveGraph}
          />
        </Col>
        <Col>
          <ReBarChart
            data={metrics}
            graph={loadFiveGraph}
          />
        </Col>
      </Row>
    </Container>
  );
};

GraphPage.propTypes = {
};

GraphPage.defaultProps = {
};

const enhance = compose(
);

export default enhance(GraphPage);
