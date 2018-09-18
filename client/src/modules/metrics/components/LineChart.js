/*=============================================================================
 * Copyright (C) 2018 Stephen F. Norledge and Alces Flight Ltd.
 *
 * This file is part of Flight Access.
 *
 * All rights reserved, see LICENSE.txt.
 *===========================================================================*/
import React from 'react';
import { compose } from 'recompose';
import { LineChart as D3LineChart } from 'react-d3-basic';

const xValueGenerators = {
  timestampToDate: (d) => {
    return d.timestamp;
  },
};

const LineChart = ({
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
      <D3LineChart
        chartSeries={graph.chartSeries}
        data={data}
        height={height}
        margins={margins}
        showXGrid={false}
        showYGrid={false}
        title={graph.title}
        width={width}
        x={xValueGenerators[graph.xAccessor]}
        // xScale="time"
      />
    </div>
  );
};

LineChart.propTypes = {
};

LineChart.defaultProps = {
  width: 700,
  height: 300,
  margins: { left: 100, right: 100, top: 50, bottom: 50 },
};

const enhance = compose(
);

export default enhance(LineChart);
