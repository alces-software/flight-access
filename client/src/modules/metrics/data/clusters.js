export const MEG = {
  id: 'MEG',
  name: 'Megatron',
  description: 'On-site HPC cluster.',

  ipAddress: '34.243.19.155',
  "webTerminal": {
    "url": "https://megatron-dc09bb3f.cloud.alces.network/pty",
    "socketIO": {
      "path": "/terminal/socket.io"
    }
  },
};

export const OPT = {
  id: 'OPT',
  name: 'Optimus',
  description: 'AWS hosted HPC cluster.',

  ipAddress: '34.245.15.130',
  "webTerminal": {
    "url": "https://optimus-c8ff83c1.cloud.alces.network/pty",
    "socketIO": {
      "path": "/terminal/socket.io"
    }
  },
};
