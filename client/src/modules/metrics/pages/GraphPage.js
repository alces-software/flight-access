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
import { Redirect } from 'react-router-dom';
import { branch, compose, renderComponent } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import * as selectors from '../selectors';
import SizedGraph from '../components/SizedGraph';

const GraphPage = ({ cluster, graph, metrics }) => {
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
      <SizedGraph
        graph={graph}
        metrics={metrics}
      />
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
    ({ cluster, graph }) => cluster == null || graph == null,
    renderComponent(({ cluster, graph }) => {
      const path = cluster == null ? '/' : `/clusters/${cluster.id}`;
      return <Redirect to={path} />;
    }),
  ),
);

export default enhance(GraphPage);
