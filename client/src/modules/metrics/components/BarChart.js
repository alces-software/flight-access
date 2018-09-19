/*=============================================================================
 * Copyright (C) 2018 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Access.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import React from 'react';
import { compose } from 'recompose';
import { BarChart as D3BarChart } from 'react-d3-basic';

const xValueGenerators = {
  timestampToHoursAndMinutes: (d) => {
    // XXX Can't get this working correctly.  What gives?
    return d.timestamp;
  },
};

const BarChart = ({
  /* eslint-disable react/prop-types */
  data,
  graph,
  height,
  margins,
  width,
  /* eslint-enable react/prop-types */
}) => {
  return (
    <div>
      <D3BarChart
        chartSeries={graph.chartSeries}
        data={data}
        height={height}
        margins={margins}
        showXGrid={false}
        showYGrid={false}
        title={graph.title}
        width={width}
        x={xValueGenerators[graph.xAxisFormatter]}
        xScale="ordinal"
      />
    </div>
  );
};

BarChart.propTypes = {
};

BarChart.defaultProps = {
  width: 700,
  height: 300,
  margins: { left: 100, right: 100, top: 50, bottom: 50 },
};

const enhance = compose(
);

export default enhance(BarChart);
