/*=============================================================================
 * Copyright (C) 2018 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Access.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';

import * as timeFormatters from '../utils/timeFormatters';

// eslint-disable-next-line react/prop-types
const ReBarChart = ({ data, graph }) => (
  <BarChart
    data={data}
    height={300}
    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    width={600}
  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey={timeFormatters[graph.xAxisFormatter]} />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar
      dataKey={graph.chartSeries[0].field}
      fill="#8884d8"
      name={graph.chartSeries[0].name}
    />
    {/*
    <Bar
      dataKey="uv"
      fill="#82ca9d"
    />
    */}
  </BarChart>
);

export default ReBarChart;
