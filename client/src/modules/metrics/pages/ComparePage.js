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

import * as metrics from '../data/metrics';

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
      {comparisons.map((c, idx) => (
        <SizedGraph
          graph={c.graph}
          key={idx}
          metrics={metrics[c.cluster.id]}
          syncId="someValue"
          title={c.cluster.name}
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
    comparisons: selectors.comparisons,
  })),

  branch(
    ({ comparisons }) => comparisons.length === 0,
    renderComponent(() => <Redirect to="/metrics" />),
  ),
);

export default enhance(ComparePage);

