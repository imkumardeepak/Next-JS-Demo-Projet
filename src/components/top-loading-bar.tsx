"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import LoadingBar from 'react-top-loading-bar';

function TopLoadingBarComponent() {
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setProgress(40);
    const timer = setTimeout(() => setProgress(100), 300); // Simulate loading
    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  useEffect(() => {
    // This is to handle the initial load, where the progress might complete before the bar is visible.
    // It ensures the bar shows up and completes.
    setProgress(40);
    const timer = setTimeout(() => setProgress(100), 300);
     return () => clearTimeout(timer);
  }, []);


  return (
    <LoadingBar
      color="hsl(var(--primary))"
      progress={progress}
      onLoaderFinished={() => setProgress(0)}
      waitingTime={400}
      height={3}
      shadow={true}
    />
  );
};

// Wrap the component in Suspense as it uses usePathname and useSearchParams
export default function TopLoadingBar() {
    return (
        <Suspense fallback={null}>
            <TopLoadingBarComponent />
        </Suspense>
    )
}
