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
import { Redirect } from 'react-router-dom';
import { branch, compose, renderComponent } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';

import * as selectors from '../selectors';

const Terminal = () => (
  <div>XXX Add terminal here.</div>
);

const PaddedContainer = styled(Container)`
  padding-top: 15px;
  padding-bottom: 15px;
`;

const env = {
  LANG: 'en_GB.UTF-8',
};

const AccessPage = ({ cluster }) => {
  return (
    <PaddedContainer fluid >
      <Terminal
        socketIOPath="XXX"
        socketIOUrl="XXX"
        termProps={{
          env: env,
        }}
      />
    </PaddedContainer>
  );
};

AccessPage.propTypes = {
  cluster: PropTypes.object.isRequired,
};

AccessPage.defaultProps = {
};

const enhance = compose(
  connect(createStructuredSelector({
    cluster: selectors.selectedCluster,
  })),

  branch(
    ({ cluster }) => cluster == null,
    renderComponent(() => <Redirect to="/" />),
  ),
);

export default enhance(AccessPage);
