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
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';

import * as timeFormatters from '../utils/timeFormatters';

const ReBarChart = ({ data, graph }) => {
  const bars = graph.chartSeries.map((series) => (
    <Bar
      dataKey={series.field}
      fill={series.color}
      key={series.field}
      name={series.name}
    />
  ));

  return (
    <BarChart
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
      {bars}
    </BarChart>
  );
};

ReBarChart.propTypes = {
  data: PropTypes.array.isRequired,
  graph: PropTypes.shape({
    chartSeries: PropTypes.arrayOf(PropTypes.shape({
      color: PropTypes.string,
      field: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
};

export default ReBarChart;
