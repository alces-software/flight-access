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
  Legend,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from 'recharts';

import * as timeFormatters from '../utils/timeFormatters';


function generateSeries(data) {
  const series = [];
  let processingDay;
  let daySeries = [];
  data.forEach(d => {
    const date = new Date(d.timestamp * 1000);
    const currentDay = date.getDate();
    if (processingDay == null) {
      processingDay = currentDay;
    }
    if (processingDay !== currentDay) {
      series.push(daySeries);
      daySeries = [];
      processingDay = currentDay;
    }
    daySeries.push(d);
  });
  return series;
}

function parseDomain(data, field) {
  return [
    0,
    Math.max.apply(null, [
      ...data.map(d => d[field]),
    ])
  ];
};

// eslint-disable-next-line react/prop-types
function renderTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const timestamp = payload[0].payload.timestamp;
    const date = new Date(timestamp * 1000).toString();
    const value = payload[0].value;

    return (
      <div
        style={{
          backgroundColor: '#fff',
          border: '1px solid #999',
          margin: 0,
          padding: 10
        }}
      >
        <p>{date}</p>
        <p><span>value: </span>{value}</p>
      </div>
    );
  }

  return null;
}

const BubbleLine = ({
  data,
  domain,
  field,
  finalLine,
  label,
  name,
  range,
  chartSeries,
  width,
  xAxisFormatter,
}) => (
  <ScatterChart
    height={finalLine ? (60 + 24) : 60}
    margin={{ top: 10, right: 0, bottom: 0, left: 0 }}
    width={width}
  >
    <XAxis
      dataKey={timeFormatters[xAxisFormatter]}
      tick={{ fontSize: finalLine ? undefined : 0 }}
      tickLine={{ transform: 'translate(0, -6)' }}
      type="category"
    />
    <YAxis
      axisLine={false}
      dataKey={() => 1}
      height={10}
      label={{ value: label, position: 'insideRight' }}
      name={name}
      tick={false}
      tickLine={false}
      type="number"
      width={90}
    />
    <ZAxis
      dataKey={field}
      domain={domain}
      range={range}
      type="number"
    />
    <Tooltip
      content={renderTooltip(chartSeries)}
      cursor={{ strokeDasharray: '3 3' }}
      wrapperStyle={{ zIndex: 100 }}
    />
    { finalLine ? <Legend /> : null }
    <Scatter
      data={data} 
      fill={chartSeries.color}
      name={chartSeries.name}
    />
  </ScatterChart>
);

BubbleLine.propTypes = {
  chartSeries: PropTypes.shape({
    color: PropTypes.string,
    field: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  data: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  domain: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  field: PropTypes.string.isRequired,
  finalLine: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  range: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  width: PropTypes.number.isRequired,
  xAxisFormatter: PropTypes.string.isRequired,
};

const BubbleChart = ({ data, graph, syncId, width }) => {
  const chartSeries = graph.chartSeries[0];
  const field = chartSeries.field;
  const metrics = generateSeries(data);
  const domain = parseDomain(data, field);
  const range = [16, 225];

  const lines = [
    { name: 'monday',    label: 'Monday',    data: metrics[0] },
    { name: 'tuesday',   label: 'Tuesday',   data: metrics[1] },
    { name: 'wednesday', label: 'Wednesday', data: metrics[2] },
    { name: 'thursday',  label: 'Thursday',  data: metrics[3] },
    { name: 'friday',    label: 'Friday',    data: metrics[4] },
    { name: 'saturday',  label: 'Saturday',  data: metrics[5] },
    { name: 'sunday',    label: 'Sunday',    data: metrics[6] },
  ]
    .filter(line => line.data);

  return (
    <div>
      {
        lines
          .map((line, idx) => (
            <BubbleLine
              chartSeries={chartSeries}
              data={line.data} 
              domain={domain}
              field={field}
              finalLine={idx === lines.length - 1}
              graph={graph}
              key={line.name}
              label={line.label}
              name={line.name}
              range={range}
              width={width}
              xAxisFormatter={graph.xAxisFormatter}
            />
          ))
      }
    </div>
  );
};

BubbleChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  graph: PropTypes.shape({
    chartSeries: PropTypes.arrayOf(PropTypes.shape({
      color: PropTypes.string,
      field: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
  syncId: PropTypes.string,
  width: PropTypes.number.isRequired,
};

BubbleChart.defaultProps = {
  width: 600,
};

export default BubbleChart;
