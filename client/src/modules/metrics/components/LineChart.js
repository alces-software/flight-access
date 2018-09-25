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
  CartesianGrid,
  Legend,
  Line,
  LineChart as BaseLineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import * as timeFormatters from '../utils/timeFormatters';

const LineChart = ({ data, graph, height, syncId, tiny, width }) => {
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

  const domain = graph.yAxis && graph.yAxis.domain ?
    graph.yAxis.domain :
    ['auto', 'auto'];

  return (
    <BaseLineChart
      data={data}
      height={height || width / 4}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      syncId={syncId}
      width={width}
    >
      { tiny ? null : <XAxis dataKey={timeFormatters[graph.xAxisFormatter]} /> }
      <YAxis
        domain={domain}
        hide={tiny}
      />
      { tiny ? null : <CartesianGrid strokeDasharray="3 3" /> }
      { tiny ? null : <Tooltip /> }
      { tiny ? null : <Legend /> }
      {lines}
    </BaseLineChart>
  );
};

LineChart.propTypes = {
  data: PropTypes.array.isRequired,
  graph: PropTypes.shape({
    chartSeries: PropTypes.arrayOf(PropTypes.shape({
      color: PropTypes.string,
      field: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
  height: PropTypes.number,
  syncId: PropTypes.string,
  tiny: PropTypes.bool,
  width: PropTypes.number.isRequired,
};

LineChart.defaultProps = {
  width: 600,
};

export default LineChart;
