/*=============================================================================
 * Copyright (C) 2018 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Access.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import PropTypes from 'prop-types';
import React from 'react';
import {
  Area,
  AreaChart as BaseAreaChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import * as timeFormatters from '../utils/timeFormatters';

function toPercent(decimal, fixed = 0) {
  return `${(decimal * 100).toFixed(fixed)}%`;
}

const StackedAreaChart = ({ data, graph, height, syncId, tiny, width }) => {
  const areas = graph.chartSeries.map((series) => (
    <Area
      dataKey={series.field}
      fill={series.color}
      key={series.field}
      name={series.name}
      stackId={1}
      type={series.type}
    />
  ));

  return (
    <BaseAreaChart
      data={data}
      height={height}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      stackOffset="expand"
      syncId={syncId}
      width={width}
    >
      { tiny || <XAxis dataKey={timeFormatters[graph.xAxisFormatter]} /> }
      { tiny || <YAxis tickFormatter={toPercent} /> }
      { tiny || <CartesianGrid strokeDasharray="3 3" /> }
      { tiny || <Tooltip /> }
      { tiny || <Legend /> }
      {areas}
    </BaseAreaChart>
  );
};

StackedAreaChart.propTypes = {
  data: PropTypes.array.isRequired,
  graph: PropTypes.shape({
    chartSeries: PropTypes.arrayOf(PropTypes.shape({
      color: PropTypes.string,
      field: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
  height: PropTypes.number.isRequired,
  syncId: PropTypes.string,
  tiny: PropTypes.bool,
  width: PropTypes.number.isRequired,
};

StackedAreaChart.defaultProps = {
  height: 300,
  width: 600,
};

export default StackedAreaChart;
