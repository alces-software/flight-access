// 1. Busyness of the entire machine (cluster).
// 2. What wait time should I expect?
// 3. Busyness of login nodes (fullness of file systems).
// 4. GPUs available.

export const nodesAvailable = {
  id: 'nodesAvailable',
  graphType: 'line',
  title: "Percentage load of cluster",
  // subtitle: "Percentage load of cluster",
  description: "Compare the busyness of your organization's clusters.",
  chartSeries: [
    {
      field: 'load',
      name: 'Percentage load of cluster',
      color: '#ff7f0e'
    }
  ],
  xAxisFormatter: 'timestampToHoursAndMinutes',
};

export const foo = {
  id: 'foo',
  graphType: 'bar',
  title: "GPUs available",
  description: "Compare the available GPUs of your organization's clusters.",
  chartSeries: [
    {
      field: 'gpus_available',
      name: 'Available GPUs',
      color: '#ff7f0e'
    }
  ],
  xAxisFormatter: 'timestampToHoursAndMinutes',
};
