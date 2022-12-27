/* eslint-disable @typescript-eslint/no-explicit-any */
type Priority = 'low' | 'high' | 'critical';

type PriorityMap = {
  [key in Priority]: {
    maxExecTime: number;
    minSleepTime: number;
  };
};

const priorityMap: PriorityMap = {
  low: {
    maxExecTime: 50,
    minSleepTime: 3000,
  },
  high: {
    maxExecTime: 100,
    minSleepTime: 2000,
  },
  critical: {
    maxExecTime: 150,
    minSleepTime: 1000,
  },
};

export { Priority, priorityMap };
