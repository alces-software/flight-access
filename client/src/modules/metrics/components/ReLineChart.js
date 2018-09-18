/*=============================================================================
 * Copyright (C) 2018 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Access.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';

import * as timeFormatters from '../utils/timeFormatters';

// eslint-disable-next-line react/prop-types
const ReLineChart = ({ data, graph }) => (
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
    <Line
      activeDot={{ r: 8 }}
      dataKey={graph.chartSeries[0].field}
      name={graph.chartSeries[0].name}
      stroke="#8884d8"
      type="monotone"
    />
    {/*
    <Line
      dataKey="uv"
      stroke="#82ca9d"
      type="monotone"
    />
    */}
  </LineChart>
);

export default ReLineChart;
