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
// import { connect } from 'react-redux';
import { LinkContainer } from 'flight-reactware';
// import FontAwesome from 'react-fontawesome';

const GraphSelectionOption = ({ graph }) => {
  const href = `/metrics/${graph.id}`;
  return (
    <LinkContainer to={href} >
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
          <LinkContainer to={href}>
            <Button color="primary" >View</Button>
          </LinkContainer>
        </CardBody>
      </Card>
    </LinkContainer>
  );
};

GraphSelectionOption.propTypes = {
  graph: PropTypes.shape({
    title: PropTypes.node.isRequired,
  }).isRequired,
};

export default GraphSelectionOption;
