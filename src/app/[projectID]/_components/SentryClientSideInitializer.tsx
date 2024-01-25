'use client';

import useSentryInit from '../../../hooks/useSentryInit';

const SentryClientSideInitializer = () => {
  useSentryInit();
  return null;
};

export default SentryClientSideInitializer;
