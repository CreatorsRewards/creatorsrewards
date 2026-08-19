"use client";

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // 1. Grab the token from the URL (e.g., ?token=eyJh...)
    const token = searchParams.get('token');

    if (token) {
      // 2. Save the token (localStorage, Context, or send to an API to set a cookie)
      localStorage.setItem('auth_token', token);
      
      // 3. Redirect the user to their dashboard, cleaning up the URL
      router.push('/dashboard');
    } else {
      // Handle missing token scenario
      router.push('/login?error=auth_failed');
    }
  }, [router, searchParams]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
      <p>Logging you in...</p>
    </div>
  );
}