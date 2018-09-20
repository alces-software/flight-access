export const nodesAvailable = {
  id: 'nodesAvailable',
  graphType: 'line',
  title: "Nodes available to scheduler",
  subtitle: "Number of nodes available for use by the scheduler",
  chartSeries: [
    {
      field: 'load1',
      name: 'Nodes available',
      color: '#ff7f0e'
    }
  ],
  xAxisFormatter: 'timestampToHoursAndMinutes',
};

export const nodesAvailableQueue = {
  id: 'nodesAvailableQueue',
  graphType: 'bar',
  title: "Nodes available to queue bynode.q",
  subtitle: "Number of nodes available for use to the queue bynode.q",
  chartSeries: [
    {
      field: 'load5',
      name: 'Nodes available (bynode.q)',
      color: '#ff7f0e'
    }
  ],
  xAxisFormatter: 'timestampToHoursAndMinutes',
};

export const nodesAvailableAllQueues = {
  id: 'nodesAvailableAllQueues',
  graphType: 'bar',
  title: "Nodes available for each queue",
  subtitle: "Number of nodes available for use for each queue",
  chartSeries: [
    {
      field: 'load5',
      name: 'Nodes available (bynode.q)',
      color: '#7f7f0e'
    },
    {
      field: 'load15',
      name: 'Nodes available (byslot.q)',
      color: '#ff7f0e'
    },
  ],
  xAxisFormatter: 'timestampToHoursAndMinutes',
};
