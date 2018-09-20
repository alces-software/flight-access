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
import LineChart from '../components/LineChart';

import * as metrics from '../data/metrics';

const graphTypes = {
  bar: BarChart,
  line: LineChart,
};

const GraphWrapper = ({ comparison, size }) => {
  const { cluster, graph } = comparison;
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
    <div>
      <h4>{cluster.name}</h4>
      <GraphComponent
        data={metrics[cluster.id]}
        graph={graph}
        syncId="someId"
        width={size.width}
      />
    </div>
  );
};

GraphWrapper.propTypes = {
  comparison: PropTypes.shape({
    cluster: PropTypes.object.isRequired,
    graph: PropTypes.object.isRequired,
  }).isRequired,
  size: PropTypes.shape({
    width: PropTypes.number.isRequired,
  }).isRequired,
};

const ComparePage = ({ comparisons }) => {
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
  return (
    <Container>
      <PageHeading
        overview={overview}
        sections={[]}
        title={title}
      />
      <SizeMe monitorWidth >
        {({ size }) => (
          <div>
            {comparisons.map((c, idx) => (
              <GraphWrapper
                comparison={c}
                key={idx}
                size={size}
              />
            ))}
          </div>
        )}
      </SizeMe>
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
    comparisons: selectors.comparisons,
  })),

  branch(
    ({ comparisons }) => comparisons.length === 0,
    renderComponent(() => <Redirect to="/metrics" />),
  ),
);

export default enhance(ComparePage);

