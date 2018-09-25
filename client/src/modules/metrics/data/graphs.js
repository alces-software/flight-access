// XXX What graphs do we want?
//
// Cluster:
//
//  - nodes available
//
// Queues:  per queue and total.
//
//  - nodes available
//  - nodes used
//  - nodes total
//  - cores available
//  - cores used
//  - cores total
//  - jobs queued
//  - jobs running

export const busyness = {
  id: 'busyness',
  graphType: 'bar',
  title: "Percentage load of cluster",
  description: "Compare the busyness of your organization's clusters.",
  yAxis: {
    domain: [0, 100],
  },
  chartSeries: [
    {
      field: 'load',
      name: 'Percentage load of cluster',
      color: '#ff7f0e'
    },
  ],
  xAxisFormatter: 'timestampToHoursAndMinutes',
};

export const gpusAvailable = {
  id: 'gpusAvailable',
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

export const waitTime = {
  id: 'waitTime',
  graphType: 'bar',
  title: "Average job wait time",
  description: "The average length of time a job waits after being submitted.",
  chartSeries: [
    {
      field: 'job_wait_time',
      name: 'Available GPUs',
      color: '#ff7f0e'
    }
  ],
  xAxisFormatter: 'timestampToHoursAndMinutes',
};

export const availableStorage = {
  id: 'availableStorage',
  graphType: 'bar',
  title: "Available cluster storage",
  description: "The shared cluster storage available in GiBs.",
  chartSeries: [
    {
      field: 'available_storage',
      name: 'Available GPUs',
      color: '#ff7f0e'
    }
  ],
  xAxisFormatter: 'timestampToHoursAndMinutes',
};
