export const loadOneReline = {
  id: 'loadOneReline',
  graphType: 'line',
  title: "Load one for the last hour",
  subtitle: "Recharts line chart",
  chartSeries: [
    {
      field: 'load1',
      name: 'Load one',
      color: '#ff7f0e'
    }
  ],
  xAxisFormatter: 'timestampToHoursAndMinutes',
};

export const loadOneReBar = {
  id: 'loadOneReBar',
  graphType: 'bar',
  title: "Load one for the last hour",
  subtitle: "Recharts bar chart",
  chartSeries: [
    {
      field: 'load1',
      name: 'Load one',
      color: '#ff7f0e'
    }
  ],
  xAxisFormatter: 'timestampToHoursAndMinutes',
};

export const loadFive = {
  id: 'loadFive',
  graphType: 'reline',
  title: "Load five for the last hour",
  chartSeries: [
    {
      field: 'load5',
      name: 'Load five',
      color: '#ff7f0e'
    }
  ],
  xAxisFormatter: 'timestampToHoursAndMinutes',
};

export const loadsReLine = {
  id: 'loadsReLine',
  graphType: 'line',
  title: "Load one and five for the last hour",
  subtitle: "Recharts line chart",
  chartSeries: [
    {
      field: 'load1',
      name: 'Load one',
      color: '#7fff0e'
    },
    {
      field: 'load5',
      name: 'Load five',
      color: '#ff7f0e'
    },
  ],
  xAxisFormatter: 'timestampToHoursAndMinutes',
};

export const loadsReBar = {
  id: 'loadsReBar',
  graphType: 'bar',
  title: "Load one and five for the last hour",
  subtitle: "Recharts bar chart",
  chartSeries: [
    {
      field: 'load1',
      name: 'Load one',
      color: '#7fff0e'
    },
    {
      field: 'load5',
      name: 'Load five',
      color: '#ff7f0e'
    },
  ],
  xAxisFormatter: 'timestampToHoursAndMinutes',
};
