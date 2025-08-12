
"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Loader } from './loader';

function PageLoaderComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    // This timeout simulates the page loading time.
    // In a real app, you might use router events if available or other state management.
    const timer = setTimeout(() => {
        setIsLoading(false)
    }, 500); 

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);


  return (
    <div className={cn("page-loader-wrapper", { 'is-loading': isLoading })}>
        <Loader />
    </div>
  );
};

// Wrap the component in Suspense as it uses usePathname and useSearchParams
export function PageLoader() {
    return (
        <Suspense fallback={null}>
            <PageLoaderComponent />
        </Suspense>
    )
}
