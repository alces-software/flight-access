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
import * as comparisons from '../data/comparisons';
import EqualHeightRow from '../../../components/EqualHeightRow';
import ClusterSelectionOption from '../components/ClusterSelectionOption';
import ComparisonSelectionOption from '../components/ComparisonSelectionOption';

const ClusterSelectionPage = () => {
  const clusterOptions = Object.keys(clusters).map(clusterId => {
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

  const comparisonOptions = Object.keys(comparisons).map(comparisonId => {
    const comparison = comparisons[comparisonId];
    return (
      <Col
        key={comparison.id}
        md={4}
      >
        <ComparisonSelectionOption comparison={comparison} />
      </Col>
    );
  });

  return (
    <Container fluid >
      <h4>
        Clusters
      </h4>
      <EqualHeightRow>
        {clusterOptions}
      </EqualHeightRow>
      <h4>
        Comparisons
      </h4>
      <EqualHeightRow>
        {comparisonOptions}
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
