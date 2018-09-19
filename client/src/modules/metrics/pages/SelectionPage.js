/*=============================================================================
 * Copyright (C) 2018 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Access.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import PropTypes from 'prop-types';
import React from 'react';
import { push } from 'react-router-redux';
import { compose } from 'recompose';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';

import * as graphs from '../data/graphs';

let Option = ({ dispatch, graph }) => {
  const onClick = () => dispatch(push(`/metrics/${graph.id}`));

  return (
    <div
      onClick={onClick}
      style={{ border: '1px solid black' }}
    >
      <div>
        <h4>
          {graph.title}
        </h4>
      </div>
      <div>
        <h6>
          {graph.subtitle}
        </h6>
      </div>
      <div>
        <button
          onClick={onClick}
        >
          View
        </button>
      </div>
    </div>
  );
};

Option.propTypes = {
  dispatch: PropTypes.func.isRequired,
  graph: PropTypes.shape({
    title: PropTypes.node.isRequired,
  }).isRequired,
};
Option = connect()(Option);

const SelectionPage = () => {
  const options = Object.keys(graphs).map(graphId => {
    const graph = graphs[graphId];
    return (
      <Col key={graph.id}>
        <Option graph={graph} />
      </Col>
    );
  });

  return (
    <Container fluid >
      <Row>
        {options}
      </Row>
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
