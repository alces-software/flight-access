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
// import * as comparisons from '../data/comparisons';
import EqualHeightRow from '../../../components/EqualHeightRow';
// import ClusterSelectionOption from '../components/ClusterSelectionOption';
// import ComparisonSelectionOption from '../components/ComparisonSelectionOption';
import ClusterOverview from '../components/ClusterOverview';

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
          timeframe="day"
        />
      </Col>
    );
  });

  return (
    <Container fluid >
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
