/* eslint-disable @typescript-eslint/no-explicit-any */
type Priority = 'low' | 'high' | 'critical';
type priorityMap = {
  [key in Priority]: {
    maxExecTime: number;
    minSleepTime: number;
  };
};

const priorityMap: priorityMap = {
  low: {
    maxExecTime: 100,
    minSleepTime: 3000,
  },
  high: {
    maxExecTime: 150,
    minSleepTime: 2000,
  },
  critical: {
    maxExecTime: 200,
    minSleepTime: 1000,
  },
};

export { Priority, priorityMap };
