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

const ComparisonSelectionOption = ({ dispatch, comparison }) => {
  const href = `/comparison/${comparison.id}`;
  const onClick = () => dispatch(actions.comparisonSelected(comparison.id));

  return (
    <LinkContainer
      onClick={onClick}
      to={href}
    >
      <Card>
        <CardBody>
          <CardTitle>
            {comparison.title}
          </CardTitle>
          {
            comparison.subtitle == null ? null : (
              <CardSubtitle>
                {comparison.subtitle}
              </CardSubtitle>
            )
          }
          <CardText>
            {comparison.description}
          </CardText>
          <LinkContainer
            onClick={onClick}
            to={href}
          >
            <Button color="primary" >View comparison</Button>
          </LinkContainer>
        </CardBody>
      </Card>
    </LinkContainer>
  );
};

ComparisonSelectionOption.propTypes = {
  comparison: PropTypes.shape({
    description: PropTypes.node,
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    subtitle: PropTypes.node,
    title: PropTypes.node.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(ComparisonSelectionOption);
