/*=============================================================================
 * Copyright (C) 2018 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Access.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import PropTypes from 'prop-types';
import React from 'react';
import {
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
} from 'reactstrap';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';

import CallToAction from '../../../components/CallToAction';
import EqualHeightRow from '../../../components/EqualHeightRow';

import * as selectors from '../selectors';
import * as graphs from '../data/graphs';
import GraphOverview from '../components/GraphOverview';

const GraphSection = styled.div`
  padding: 15px 15px 0 15px;
`;

const ClusterOverview = ({ cluster, metrics }) => {
  const graphOverviews = Object.keys(graphs).map(graphId => (
    <GraphOverview
      graph={graphs[graphId]}
      key={graphId}
      metrics={metrics}
    />
  ));

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h3">
          {cluster.name}
        </CardTitle>
        {
          cluster.subtitle == null ? null : (
            <CardSubtitle>
              {cluster.subtitle}
            </CardSubtitle>
          )
        }
        <CardText>
          {cluster.description}
        </CardText>
        <GraphSection>
          <EqualHeightRow>
            { graphOverviews }
          </EqualHeightRow>
        </GraphSection>
        <CallToAction
          block
          icon="terminal"
          to={`/clusters/${cluster.id}/access`}
        >
          Access cluster
        </CallToAction>
      </CardBody>
    </Card>
  );
};

ClusterOverview.propTypes = {
  cluster: PropTypes.shape({
    description: PropTypes.node,
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    name: PropTypes.node.isRequired,
    subtitle: PropTypes.node,
  }).isRequired,
  metrics: PropTypes.array.isRequired,
};

export default connect(createStructuredSelector({
  metrics: selectors.clusterMetrics
}))(ClusterOverview);
