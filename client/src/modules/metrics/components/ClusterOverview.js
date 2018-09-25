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
  // Button,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  Col,
  Row,
} from 'reactstrap';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';

import CallToAction from '../../../components/CallToAction';

// import * as actions from '../actions';
import * as selectors from '../selectors';
import * as graphs from '../data/graphs';
import SizedGraph from '../components/SizedGraph';

const GraphSection = styled.div`
  padding: 15px;
`;

const ClusterOverview = ({ cluster, metrics }) => {
  const graphOverviews = Object.keys(graphs).map(graphId => {
    const graph = graphs[graphId];
    return (
      <GraphSection
        key={graph.id}
      >
        <Row>
          <Col>
            <CardSubtitle>
              {graph.title}
            </CardSubtitle>
          </Col>
        </Row>
        <Row>
          <Col>{graph.description}</Col>
        </Row>
        <Row>
          <SizedGraph
            graph={graph}
            metrics={metrics}
            tiny
          />
        </Row>
      </GraphSection>
    );
  });

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
        { graphOverviews }
        <CallToAction
          block
          icon="terminal"
          to={`/clusters/${cluster.id}/access`}
        >
          Access cluster
        </CallToAction>
        {/*
        <LinkContainer
          onClick={onClick}
          to={href}
        >
          <Button color="primary" >View available metrics</Button>
        </LinkContainer>
        */}
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
  // dispatch: PropTypes.func.isRequired,
  metrics: PropTypes.array.isRequired,
};

export default connect(createStructuredSelector({
  metrics: selectors.clusterMetrics
}))(ClusterOverview);
