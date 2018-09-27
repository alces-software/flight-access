export const MEG = {
  id: 'MEG',
  name: 'Megatron',
  description: 'On-site HPC cluster.',

  ipAddress: "34.245.235.57",
  "webTerminal": {
    "url": "https://megatron-7453a672.cloud.alces.network/pty",
    "socketIO": {
      "path": "/terminal/socket.io"
    }
  },
};

export const OPT = {
  id: 'OPT',
  name: 'Optimus',
  description: 'AWS hosted HPC cluster.',

  ipAddress: '52.16.166.46',
  "webTerminal": {
    "url": "https://optimus-3a45d492.cloud.alces.network/pty",
    "socketIO": {
      "path": "/terminal/socket.io"
    }
  },
};
