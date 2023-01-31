'use client';

import { SWRConfig } from 'swr';

export default function SWRFallback({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback: {
    [key: string]: unknown;
  };
}) {
  return (
    <SWRConfig value={{ fallback, keepPreviousData: true }}>
      {children}
    </SWRConfig>
  );
}
