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
import { SizeMe } from 'react-sizeme';
import { branch, compose, renderComponent } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import * as selectors from '../selectors';
import BarChart from '../components/BarChart';
import BubbleChart from '../components/BubbleChart';
import LineChart from '../components/LineChart';

const graphTypes = {
  bar: BarChart,
  bubble: BubbleChart,
  line: LineChart,
};

const GraphPage = ({ cluster, graph, metrics }) => {
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
  const overview = (
    <span>
      {graph.subtitle} for {cluster.name}
    </span>
  );
  return (
    <Container>
      <PageHeading
        overview={overview}
        sections={[]}
        title={graph.title}
      />
      <SizeMe monitorWidth >
        {({ size }) => (
          <GraphComponent
            data={metrics}
            graph={graph}
            width={size.width}
          />
        )}
      </SizeMe>
    </Container>
  );
};

GraphPage.propTypes = {
  cluster: PropTypes.object.isRequired,
  graph: PropTypes.object.isRequired,
  metrics: PropTypes.array.isRequired,
};

GraphPage.defaultProps = {
};

const enhance = compose(
  connect(createStructuredSelector({
    cluster: selectors.selectedCluster,
    graph: selectors.selectedGraph,
    metrics: selectors.clusterMetrics,
  })),

  branch(
    ({ graph }) => graph == null,
    renderComponent(() => <Redirect to="/metrics" />),
  ),
);

export default enhance(GraphPage);
