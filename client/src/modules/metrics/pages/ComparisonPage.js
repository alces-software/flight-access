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
import TimeframeSelect from '../components/TimeframeSelect';

// eslint-disable-next-line react/prop-types
let GraphWrapper = ({ graph, cluster, metrics, yAxisDomain }) => (
  <SizedGraph
    graph={graph}
    metrics={metrics}
    syncId="someValue"
    title={cluster.name}
    yAxisDomain={yAxisDomain}
  />
);
GraphWrapper = connect(createStructuredSelector({
  metrics: selectors.clusterMetrics,
  yAxisDomain: selectors.yAxisDomain,
}))(GraphWrapper);

const ComparePage = ({ comparisons }) => {
  // Assume that the graphs are all the same.
  const firstGraph = comparisons[0].graph;

  return (
    <Container>
      <PageHeading
        overview={firstGraph.description}
        sections={[]}
        title={firstGraph.title}
      />
      <TimeframeSelect />
      {comparisons.map((c, idx) => (
        <GraphWrapper
          cluster={c.cluster}
          graph={c.graph}
          key={idx}
          syncId="someValue"
        />
      ))}
    </Container>
  );
};

ComparePage.propTypes = {
  comparisons: PropTypes.array.isRequired,
};

ComparePage.defaultProps = {
};

const enhance = compose(
  connect(createStructuredSelector({
    comparisons: selectors.selectedComparrisons,
  })),

  branch(
    ({ comparisons }) => comparisons == null || comparisons.length === 0,
    renderComponent(() => <Redirect to="/" />),
  ),
);

export default enhance(ComparePage);

