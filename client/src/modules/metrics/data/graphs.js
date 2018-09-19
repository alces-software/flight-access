export const loadOne = {
  id: 'loadOne',
  title: "Load one for the last hour",
  chartSeries: [
    {
      field: 'load1',
      name: 'Load one',
      color: '#ff7f0e'
    }
  ],
  xAccessor: 'timestampToDate',
  xAxisFormatter: 'timestampToHoursAndMinutes',
};

export const loadFive = {
  id: 'loadFive',
  title: "Load five for the last hour",
  chartSeries: [
    {
      field: 'load5',
      name: 'Load five',
      color: '#ff7f0e'
    }
  ],
  xAccessor: 'timestampToDate',
  xAxisFormatter: 'timestampToHoursAndMinutes',
};
