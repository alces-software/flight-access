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

import * as clusters from '../data/clusters';
import EqualHeightRow from '../../../components/EqualHeightRow';
import ClusterOverview from '../components/ClusterOverview';
import TimeframeSelect from '../components/TimeframeSelect';

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
      <Row
        style={{
          marginBottom: '16px'
        }}
      >
        <Col>
          <TimeframeSelect />
        </Col>
      </Row>
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
