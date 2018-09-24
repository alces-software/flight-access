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
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
} from 'reactstrap';
import { LinkContainer } from 'flight-reactware';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import * as actions from '../actions';
import * as selectors from '../selectors';

const GraphSelectionOption = ({ cluster, dispatch, graph }) => {
  const href = `/clusters/${cluster.id}/${graph.id}`;
  const onClick = () => dispatch(actions.graphSelected(graph.id));

  return (
    <LinkContainer
      onClick={onClick}
      to={href}
    >
      <Card>
        <CardBody>
          <CardTitle>
            {graph.title}
          </CardTitle>
          {
            graph.subtitle == null ? null : (
              <CardSubtitle>
                {graph.subtitle}
              </CardSubtitle>
            )
          }
          <CardText>
            {graph.description || graph.subtitle || ''}
          </CardText>
          <LinkContainer
            onClick={onClick}
            to={href}
          >
            <Button color="primary" >View</Button>
          </LinkContainer>
          <LinkContainer
            onClick={onClick}
            to={`/compare/${graph.id}`}
          >
            <Button color="secondary" >Compare</Button>
          </LinkContainer>
        </CardBody>
      </Card>
    </LinkContainer>
  );
};

GraphSelectionOption.propTypes = {
  cluster: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  graph: PropTypes.shape({
    description: PropTypes.node,
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    subtitle: PropTypes.node,
    title: PropTypes.node.isRequired,
  }).isRequired,
};

export default connect(createStructuredSelector({
  cluster: selectors.selectedCluster,
}))(GraphSelectionOption);
