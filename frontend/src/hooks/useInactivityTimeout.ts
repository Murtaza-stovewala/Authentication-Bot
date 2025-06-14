"use client";

import { useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { clearUser } from '@/lib/auth';

const INACTIVITY_TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes

export function useInactivityTimeout() {
  const router = useRouter();
  const { toast } = useToast();
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  const logout = useCallback(() => {
    clearUser();
    toast({
      title: "Session Expired",
      description: "You have been logged out due to inactivity.",
      variant: "destructive",
    });
    router.replace('/register');
  }, [router, toast]);

  const resetTimeout = useCallback(() => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }
    timeoutIdRef.current = setTimeout(logout, INACTIVITY_TIMEOUT_MS);
  }, [logout]);

  useEffect(() => {
    const events = ['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart'];

    const eventListener = () => {
      resetTimeout();
    };

    events.forEach(event => window.addEventListener(event, eventListener));
    resetTimeout(); // Initialize timeout

    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
      events.forEach(event => window.removeEventListener(event, eventListener));
    };
  }, [resetTimeout]);

  return null; // This hook doesn't render anything, just manages side effects
}
