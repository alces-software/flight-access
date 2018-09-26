/*=============================================================================
 * Copyright (C) 2018 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Access.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import React from 'react';
import { Container, Col, Row } from 'reactstrap';
import { compose } from 'recompose';
import styled from 'styled-components';

import * as clusters from '../data/clusters';
import EqualHeightRow from '../../../components/EqualHeightRow';
import ClusterOverview from '../components/ClusterOverview';
import TimeframeSelect from '../components/TimeframeSelect';

const PaddedRow = styled(Row)`
  margin-bottom: 16px;
`;

const ClusterOverviewPage = () => {
  const clusterOverviews = Object.keys(clusters).map(clusterId => {
    const cluster = clusters[clusterId];
    return (
      <Col
        key={cluster.id}
        md={6}
      >
        <ClusterOverview
          cluster={cluster}
        />
      </Col>
    );
  });

  return (
    <Container fluid >
      <PaddedRow>
        <Col>
          <TimeframeSelect />
        </Col>
      </PaddedRow>
      <EqualHeightRow>
        {clusterOverviews}
      </EqualHeightRow>
    </Container>
  );
};

ClusterOverviewPage.propTypes = {
};

ClusterOverviewPage.defaultProps = {
};

const enhance = compose(
);

export default enhance(ClusterOverviewPage);
