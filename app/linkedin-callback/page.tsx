'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLinkedInCallback } from '@/hooks/useLinkedIn';
import { Linkedin, ArrowRight } from 'lucide-react';

export default function LinkedInCallback() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const error = searchParams.get('error');
  const errorDescription = searchParams.get('error_description');
  
  const { mutate: handleCallback, isLoading } = useLinkedInCallback(
    code, 
    state, 
    error, 
    errorDescription
  );

  const hasCalledBack = useRef(false);

  useEffect(() => {
    if (!hasCalledBack.current) {
      hasCalledBack.current = true;
      handleCallback();
    }
  }, [handleCallback]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-primary/5">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <div className="text-center space-y-6">
            <div className="relative mx-auto w-20 h-20">
              <div className="absolute inset-0 rounded-full bg-primary/5 animate-pulse" />
              <div className="absolute inset-2 rounded-full bg-primary/10 animate-pulse [animation-delay:150ms]" />
              <div className="absolute inset-4 rounded-full bg-primary/15 animate-pulse [animation-delay:300ms]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Linkedin className="w-8 h-8 text-primary" />
              </div>
            </div>
            <div className="relative mx-auto w-12 h-12">
              <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
              <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Connecting your LinkedIn account
              </h2>
              <p className="text-gray-500 text-sm">
                Please wait while we securely connect your profile...
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                Verifying
              </span>
              <ArrowRight className="w-3 h-3" />
              <span className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                Connecting
              </span>
              <ArrowRight className="w-3 h-3" />
              <span className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/20" />
                Completing
              </span>
            </div>
            <div className="pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-400 flex items-center justify-center gap-1.5">
                <svg
                  className="w-3.5 h-3.5 text-primary/60"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                Secure connection with end-to-end encryption
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 