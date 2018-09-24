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
