export const nodesAvailable = {
  id: 'nodesAvailable',
  graphType: 'line',
  title: "Nodes available to scheduler",
  subtitle: "Number of nodes available for use by the scheduler",
  description: "Compare the number of nodes available to the scheduler for each of your organizations clusters.",
  chartSeries: [
    {
      field: 'nodesAvailableToScheduler',
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
  description: "Compare the number of nodes available to the queue bynode.q for each of your organizations clusters.",
  chartSeries: [
    {
      field: 'nodesAvailableToQueueByNode',
      name: 'Nodes available (bynode.q)',
      color: '#ff7f0e'
    }
  ],
  xAxisFormatter: 'timestampToHoursAndMinutes',
};

export const nodeSchedulerStatus = {
  id: 'nodeSchedulerStatus',
  graphType: 'stackedArea',
  title: "Nodes scheduler status",
  subtitle: "Status of the nodes for the scheduler",
  description: "Compare the scheduler status of the nodes for each of your organizations clusters.",
  chartSeries: [
    {
      field: 'nodesAvailableToScheduler',
      name: 'Nodes available',
      color: '#ff7f0e',
      type: 'monotone',
    },
    {
      field: 'nodesAvailableToQueueByNode',
      name: 'Nodes in use',
      color: '#0d6f0d',
      type: 'monotone',
    },
  ],
  xAxisFormatter: 'timestampToHoursAndMinutes',
};
