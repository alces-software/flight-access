/*=============================================================================
 * Copyright (C) 2018 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Access.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import React from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'reactstrap';
import { compose } from 'recompose';

import * as graphs from '../data/graphs';
import GraphSelectionOption from '../components/GraphSelectionOption';

const EqualHeightRow = styled(Row)`
  display: flex;
  flex-wrap: wrap;
  & > [class*='col-'] {
    display: flex;
    flex-direction: column;
    margin-bottom: 6px;
  }

  .card {
      flex: 1;
  }
`;

const SelectionPage = () => {
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

SelectionPage.propTypes = {
};

SelectionPage.defaultProps = {
};

const enhance = compose(
);

export default enhance(SelectionPage);
