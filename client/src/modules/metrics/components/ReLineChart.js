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
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';

import * as timeFormatters from '../utils/timeFormatters';

const ReLineChart = ({ data, graph }) => {
  const lines = graph.chartSeries.map((series) => (
    <Line
      dataKey={series.field}
      dot={false}
      key={series.field}
      name={series.name}
      stroke={series.color}
      type="monotone"
    />
  ));

  return (
    <LineChart
      data={data}
      height={300}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      width={600}
    >
      <XAxis dataKey={timeFormatters[graph.xAxisFormatter]} />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      {lines}
    </LineChart>
  );
};

ReLineChart.propTypes = {
  data: PropTypes.array.isRequired,
  graph: PropTypes.shape({
    chartSeries: PropTypes.arrayOf(PropTypes.shape({
      color: PropTypes.string,
      field: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
};

export default ReLineChart;
