/*=============================================================================
 * Copyright (C) 2018 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Access.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import React from 'react';
import PropTypes from 'prop-types';
import {
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle
} from 'reactstrap';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import * as actions from '../actions';
import * as selectors from '../selectors';

const timeframes = [
  "12 hours",
  "1 day",
  "1 week",
  "2 weeks",
  "4 weeks",
];

const TimeframeSelect = ({ selectedTimefame, setTimeframe }) => {
  return (
    <UncontrolledButtonDropdown>
      <DropdownToggle
        caret
        color="info"
      >
        Timeframe
      </DropdownToggle>
      <DropdownMenu>
        {
          timeframes.map(timeframe => (
            <DropdownItem
              active={timeframe === selectedTimefame}
              key={timeframe}
              onClick={setTimeframe}
              value={timeframe}
            >
              {timeframe}
            </DropdownItem>
          ))
        }
      </DropdownMenu>
    </UncontrolledButtonDropdown>
  );
};

TimeframeSelect.propTypes = {
  selectedTimefame: PropTypes.string.isRequired,
  setTimeframe: PropTypes.func.isRequired,
};

TimeframeSelect.defaultProps = {
};

const enhance = compose(
  connect(
    createStructuredSelector({
      selectedTimefame: selectors.timeframe,
    }),

    (dispatch) => ({
      setTimeframe: (event) => {
        const selectedTimefame = event.target.value;
        dispatch(actions.setTimeframe(selectedTimefame));
      },
    })),
);

export default enhance(TimeframeSelect);
