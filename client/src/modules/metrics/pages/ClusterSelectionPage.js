/*=============================================================================
 * Copyright (C) 2018 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Access.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import React from 'react';
import { Container, Col } from 'reactstrap';
import { compose } from 'recompose';

import * as clusters from '../data/clusters';
import EqualHeightRow from '../../../components/EqualHeightRow';
import ClusterSelectionOption from '../components/ClusterSelectionOption';

const ClusterSelectionPage = () => {
  const options = Object.keys(clusters).map(clusterId => {
    const cluster = clusters[clusterId];
    return (
      <Col
        key={cluster.id}
        md={4}
      >
        <ClusterSelectionOption cluster={cluster} />
      </Col>
    );
  });

  return (
    <Container fluid >
      <EqualHeightRow>
        {options}
      </EqualHeightRow>
    </Container>
  );
};

ClusterSelectionPage.propTypes = {
};

ClusterSelectionPage.defaultProps = {
};

const enhance = compose(
);

export default enhance(ClusterSelectionPage);
