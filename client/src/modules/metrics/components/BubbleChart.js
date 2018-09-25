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

const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

function generateLineData(data) {
  const lineData = [];
  let processingDay;
  let dayData = {};

  data.forEach(datum => {
    const date = new Date(datum.timestamp * 1000);
    const currentDay = date.getDate();

    if (processingDay !== currentDay) {
      let weekDayNumber = date.getDay() - 1;  // Weeks start on Monday.
      if (weekDayNumber < 0) {
        weekDayNumber = 6;
      }
      dayData = {
        name: days[weekDayNumber],
        label: days[weekDayNumber],
        data: [],
        weekDayNumber: weekDayNumber,
      };
      processingDay = currentDay;
      lineData.push(dayData);
    }
    dayData.data.push(datum);
  });

  const lastLine = lineData[lineData.length - 1];
  const lastData = lastLine.data[lastLine.data.length - 1];
  if (lastLine.data.length < 24) {
    for (let i=lastLine.data.length; i<24; i+=1) {
      // Push a blank value for the next hour.
      lastLine.data.push({
        timestamp: lastData.timestamp + (60 * 60 * i),
      });
    }
  }

  return lineData;
}

function parseDomain(data, field) {
  return [
    0,
    Math.max.apply(null, [
      ...data.map(d => d[field]),
    ])
  ];
};

const BubbleLine = ({
  chartSeries,
  data,
  domain,
  field,
  finalLine,
  label,
  name,
  sizeRange,
  syncId,
  tiny,
  width,
  xAxisFormatter,
}) => (
  <ScatterChart
    height={finalLine ? (60 + 24) : 60}
    margin={{ top: 10, right: 0, bottom: 0, left: 0 }}
    syncId={syncId}
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
      name={chartSeries.name}
      range={sizeRange}
      type="number"
    />
    {
      tiny ? null : (
        <Tooltip
          cursor={{ strokeDasharray: '3 3' }}
          wrapperStyle={{ zIndex: 100 }}
        />
      )
    }
    { tiny && finalLine ? <Legend /> : null }
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
  sizeRange: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  syncId: PropTypes.string,
  tiny: PropTypes.bool,
  width: PropTypes.number.isRequired,
  xAxisFormatter: PropTypes.string.isRequired,
};

const BubbleChart = ({ data, graph, syncId, tiny, width }) => {
  const chartSeries = graph.chartSeries[0];
  const field = chartSeries.field;
  const domain = parseDomain(data, field);
  // The size range of the "dots".
  const sizeRange = [0, 255];
  const lineData = generateLineData(data);
  
  return (
    <div>
      {
        lineData
          .map((line, idx) => (
            <BubbleLine
              chartSeries={chartSeries}
              data={line.data} 
              domain={domain}
              field={field}
              finalLine={idx === lineData.length - 1}
              graph={graph}
              key={line.name}
              label={line.label}
              name={line.name}
              sizeRange={sizeRange}
              syncId={syncId}
              tiny={tiny}
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
  tiny: PropTypes.bool,
  width: PropTypes.number.isRequired,
};

BubbleChart.defaultProps = {
  width: 600,
};

export default BubbleChart;
