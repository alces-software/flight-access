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
  Button,
  CardSubtitle,
  CardText,
  CardLink,
  Col,
} from 'reactstrap';
import styled from 'styled-components';
import { LinkContainer } from 'flight-reactware';
import { connect } from 'react-redux';

import SizedGraph from '../components/SizedGraph';
import * as actions from '../actions';


const SpacedCol = styled(Col)`
  &.col {
    margin-bottom: 16px;
  }
`;

const SpacedCardText = styled(CardText)`
  min-height: 48px;
  margin-bottom: 0;
`;


const GraphOverview = ({ dispatch, graph, metrics }) => {
  const href = `/graph/${graph.id}`;
  const onClick = () => dispatch(actions.comparisonSelected(graph.id));

  return (
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
      <CardLink>
        <LinkContainer
          onClick={onClick}
          to={href}
        >
          <Button color="link" >More detail</Button>
        </LinkContainer>
      </CardLink>
    </SpacedCol>
  );
};

GraphOverview.propTypes = {
  dispatch: PropTypes.func.isRequired,
  graph: PropTypes.shape({
    description: PropTypes.node,
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    title: PropTypes.node.isRequired,
  }).isRequired,
  metrics: PropTypes.array.isRequired,
};

export default connect()(GraphOverview);
