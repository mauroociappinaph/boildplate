import { AppProps } from 'next/app';
import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

// Inicializar Sentry
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
});

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Capturar errores no manejados
    const handleError = (error: Error) => {
      Sentry.captureException(error);
    };

    window.addEventListener('error', (event) => handleError(event.error));
    window.addEventListener('unhandledrejection', (event) => handleError(event.reason));

    return () => {
      window.removeEventListener('error', (event) => handleError(event.error));
      window.removeEventListener('unhandledrejection', (event) => handleError(event.reason));
    };
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
