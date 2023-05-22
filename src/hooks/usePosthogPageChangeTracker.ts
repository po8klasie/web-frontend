import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import posthog from 'posthog-js';
import { useEnvironment } from '../environment/environmentContext';

const posthogApiHost = 'https://app.posthog.com';

// https://posthog.com/docs/integrate/third-party/next-js
const usePosthogPageChangeTracker = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    posthog.capture('$pageview');
  }, [pathname, searchParams]);

  const {
    publicEnvironment: { POSTHOG_API_KEY },
  } = useEnvironment();

  useEffect(() => {
    if (POSTHOG_API_KEY) posthog.init(POSTHOG_API_KEY, { api_host: posthogApiHost });
  }, [POSTHOG_API_KEY]);
};

export default usePosthogPageChangeTracker;
