'use client';

import * as Sentry from '@sentry/nextjs';
import Brand from '../components/Brand';
import { useEffect } from 'react';

interface ErrorBoundaryProps {
  error: Error;
  reset: () => void;
}

const GlobalErrorPage = ({ error }: ErrorBoundaryProps) => {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  const handleClick = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  };
  return (
    <div className="w-full h-full px-5 md:px-0 md:w-4/5 mx-auto">
      <div className="mt-20 flex justify-center">
        <Brand className="text-3xl md:text-5xl font-bold" />
      </div>
      <h1 className="mt-10 text-center text-2xl md:text-3xl">Wystąpił błąd</h1>
      <div className="mt-10 flex justify-center">
        <button
          onClick={handleClick}
          className="text-lg inline-block px-3 py-1 bg-primaryBg text-primary rounded hover:shadow transition"
        >
          Wyczyść dane podręczne i odśwież stronę
        </button>
      </div>

      <div className="mt-10 flex justify-center">
        Jeśli problem nadal występuje
        {' - '}
        <a href="https://po8klasie.pl/feedback" className="underline ml-1">
          zgłoś błąd
        </a>
        .
      </div>
    </div>
  );
};

export default GlobalErrorPage;
