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
import { connect } from 'react-redux';
import { LinkContainer } from 'flight-reactware';

import * as actions from '../actions';

const ClusterSelectionOption = ({ dispatch, cluster }) => {
  const href = `/clusters/${cluster.id}`;
  const onClick = () => dispatch(actions.clusterSelected(cluster.id));

  return (
    <LinkContainer
      onClick={onClick}
      to={href}
    >
      <Card>
        <CardBody>
          <CardTitle>
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
          <LinkContainer
            onClick={onClick}
            to={href}
          >
            <Button color="primary" >View available metrics</Button>
          </LinkContainer>
        </CardBody>
      </Card>
    </LinkContainer>
  );
};

ClusterSelectionOption.propTypes = {
  cluster: PropTypes.shape({
    title: PropTypes.node.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(ClusterSelectionOption);
