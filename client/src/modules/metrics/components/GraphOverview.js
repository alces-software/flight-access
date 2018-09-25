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
  CardSubtitle,
  CardText,
  Col,
} from 'reactstrap';
import styled from 'styled-components';

import SizedGraph from '../components/SizedGraph';

const SpacedCol = styled(Col)`
  &.col {
    margin-bottom: 16px;
  }
`;

const SpacedCardText = styled(CardText)`
  min-height: 48px;
  margin-bottom: 0;
`;


const GraphOverview = ({ graph, metrics }) => (
  <SpacedCol md={6}>
    <CardSubtitle>
      {graph.title}
    </CardSubtitle>
    <SpacedCardText>
      {graph.description}
    </SpacedCardText>
    <SizedGraph
      graph={graph}
      metrics={metrics}
      tiny
    />
  </SpacedCol>
);

GraphOverview.propTypes = {
  graph: PropTypes.shape({
    description: PropTypes.node,
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    title: PropTypes.node.isRequired,
  }).isRequired,
  metrics: PropTypes.array.isRequired,
};

export default GraphOverview;
