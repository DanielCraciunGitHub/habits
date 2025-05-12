/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCallback, useRef } from "react";

export function useAsyncDebounce(
  fn: (...args: any[]) => Promise<any>,
  delay: number
) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pendingPromiseRef = useRef<{
    resolve: (value: any) => void;
    reject: (reason?: any) => void;
  } | null>(null);

  const cancel = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const debouncedFn = useCallback(
    (...args: any[]) => {
      cancel();

      return new Promise((resolve, reject) => {
        pendingPromiseRef.current = { resolve, reject };

        timeoutRef.current = setTimeout(async () => {
          try {
            const result = await fn(...args);
            pendingPromiseRef.current?.resolve(result);
          } catch (error) {
            pendingPromiseRef.current?.reject(error);
          }
        }, delay);
      });
    },
    [fn, delay]
  );

  return { debouncedFn, cancel };
}
