/*=============================================================================
 * Copyright (C) 2018 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Access.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

// import * as timeFormatters from '../utils/timeFormatters';

const Wrapper = styled.div`
  background-color: #fff;
  border: 1px solid #999;
  margin: 0;
  padding: 10;
`;

const TooltipContent = ({
  active,
  payload,
  ...rest,
}) => {
  if (active && payload && payload.length) {
    const timestamp = payload[0].payload.timestamp;
    const date = new Date(timestamp * 1000).toUTCString();
    const value = payload[0].value;
    const name = payload[0].name;

    return (
      <Wrapper>
        <p>{date}</p>
        <p><span>{name}: </span>{value}</p>
      </Wrapper>
    );
  }

  return null;
};

TooltipContent.propTypes = {
  active: PropTypes.bool.isRequired,
  payload: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    payload: PropTypes.shape({
      timestamp: PropTypes.number.isRequired,
    }),
    value: PropTypes.number.isRequired,
  })),
};

export default TooltipContent;
