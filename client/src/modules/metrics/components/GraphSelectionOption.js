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
  // CardHeader,
  CardSubtitle,
  CardText,
  CardTitle,
} from 'reactstrap';
// import { push } from 'react-router-redux';
// import { compose } from 'recompose';
// import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { LinkContainer } from 'flight-reactware';
// import FontAwesome from 'react-fontawesome';

import * as actions from '../actions';

const GraphSelectionOption = ({ dispatch, graph }) => {
  const href = `/metrics/${graph.id}`;
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
          <CardSubtitle>
            {graph.subtitle}
          </CardSubtitle>
          <CardText>
            {graph.subtitle}
            {graph.description}
          </CardText>
          <LinkContainer
            onClick={onClick}
            to={href}
          >
            <Button color="primary" >View</Button>
          </LinkContainer>
        </CardBody>
      </Card>
    </LinkContainer>
  );
};

GraphSelectionOption.propTypes = {
  dispatch: PropTypes.func.isRequired,
  graph: PropTypes.shape({
    title: PropTypes.node.isRequired,
  }).isRequired,
};

export default connect()(GraphSelectionOption);
