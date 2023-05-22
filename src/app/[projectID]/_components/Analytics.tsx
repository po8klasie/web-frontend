'use client';

import usePosthogPageChangeTracker from '../../../hooks/usePosthogPageChangeTracker';

const Analytics = () => {
  usePosthogPageChangeTracker();
  return null;
};

export default Analytics;
