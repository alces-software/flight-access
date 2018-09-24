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

import * as graphs from '../data/graphs';
import EqualHeightRow from '../../../components/EqualHeightRow';
import GraphSelectionOption from '../components/GraphSelectionOption';

const GraphSelectionPage = () => {
  const options = Object.keys(graphs).map(graphId => {
    const graph = graphs[graphId];
    return (
      <Col
        key={graph.id}
        md={4}
      >
        <GraphSelectionOption graph={graph} />
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

GraphSelectionPage.propTypes = {
};

GraphSelectionPage.defaultProps = {
};

const enhance = compose(
);

export default enhance(GraphSelectionPage);
