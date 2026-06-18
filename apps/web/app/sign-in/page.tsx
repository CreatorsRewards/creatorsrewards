"use client";

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react'; // Keep Lucide for UI icons
// Import brand icons from the Simple Icons (si) pack
import {SiGoogle, SiYoutube, SiInstagram, SiX, SiTiktok, SiSnapchat } from 'react-icons/si';

export default function SignInPage() {
  const handleOAuthSignIn = (provider) => {
    console.log(`Initiating OAuth for: ${provider}`);
  };

  const handleCredentialsSignIn = (e) => {
    e.preventDefault();
    // Grab values from the form, e.g., via FormData or state
    console.log('Initiating Email/Password sign in');
  };

  return (
    <div style={{
      minHeight: '100vh', 
      background: 'var(--bg-primary)',
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '24px',
      position: 'relative'
    }}>
      
      <div style={{ position: 'absolute', top: '24px', left: '24px' }}>
        <Link href="/" style={{ 
          color: 'var(--text-muted)', fontSize: '14px', textDecoration: 'none',
          display: 'flex', alignItems: 'center', gap: '6px'
        }}>
          <ArrowLeft size={16} strokeWidth={2} /> Back to Site
        </Link>
      </div>

      <div style={{
        width: '100%', maxWidth: '400px',
        background: 'var(--bg-card)', 
        border: '1px solid var(--border)',
        borderRadius: '16px', 
        padding: '40px',
      }}>
        
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>
            Welcome Back
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
            Sign in to your creator account
          </p>
        </div>

        {/* --- CREDENTIALS FORM --- */}
        <form onSubmit={handleCredentialsSignIn} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label htmlFor="identifier" style={{ fontSize: '14px', fontWeight: 500 }}>
              Email or Username
            </label>
            <input 
              id="identifier"
              name="identifier"
              type="text" 
              placeholder="you@example.com" 
              required
              style={{ 
                width: '100%', padding: '12px', borderRadius: '8px', 
                border: '1px solid var(--border)', background: 'transparent',
                boxSizing: 'border-box'
              }} 
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label htmlFor="password" style={{ fontSize: '14px', fontWeight: 500 }}>
                Password
              </label>
              <Link href="/forgot-password" style={{ fontSize: '12px', color: 'var(--text-muted)', textDecoration: 'none' }}>
                Forgot?
              </Link>
            </div>
            <input 
              id="password"
              name="password"
              type="password" 
              placeholder="••••••••" 
              required
              style={{ 
                width: '100%', padding: '12px', borderRadius: '8px', 
                border: '1px solid var(--border)', background: 'transparent',
                boxSizing: 'border-box'
              }} 
            />
          </div>

          <button 
            type="submit"
            style={{ 
              width: '100%', padding: '12px', borderRadius: '8px', 
              background: 'var(--text-primary, #000)', color: 'var(--bg-primary, #fff)', 
              fontWeight: 600, border: 'none', cursor: 'pointer', marginTop: '8px'
            }}
          >
            Sign In
          </button>
        </form>

        {/* --- DIVIDER --- */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Or continue with
          </span>
          <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
        </div>

        {/* --- OAUTH BUTTONS --- */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          
          <button 
            type="button"
            className="btn-ghost" 
            style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', border: '1px solid var(--border)', padding: '12px', borderRadius: '8px', cursor: 'pointer', background: 'transparent' }}
            onClick={() => handleOAuthSignIn('google')}
          >
            <SiGoogle size={18} color="#4285F4" /> Continue with Google
          </button>

          <button 
            type="button"
            className="btn-ghost" 
            style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', border: '1px solid var(--border)', padding: '12px', borderRadius: '8px', cursor: 'pointer', background: 'transparent' }}
            onClick={() => handleOAuthSignIn('youtube')}
          >
            <SiYoutube size={18} color="#FF0000" /> Continue with YouTube
          </button>

          <button 
            type="button"
            className="btn-ghost" 
            style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', border: '1px solid var(--border)', padding: '12px', borderRadius: '8px', cursor: 'pointer', background: 'transparent' }}
            onClick={() => handleOAuthSignIn('instagram')}
          >
            <SiInstagram size={18} color="#E4405F" /> Continue with Instagram
          </button>

          <button 
            type="button"
            className="btn-ghost" 
            style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', border: '1px solid var(--border)', padding: '12px', borderRadius: '8px', cursor: 'pointer', background: 'transparent' }}
            onClick={() => handleOAuthSignIn('twitter')}
          >
            <SiX size={18} color="#000000" /> Continue with X
          </button>

          <button 
            type="button"
            className="btn-ghost" 
            style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', border: '1px solid var(--border)', padding: '12px', borderRadius: '8px', cursor: 'pointer', background: 'transparent' }}
            onClick={() => handleOAuthSignIn('tiktok')}
          >
            <SiTiktok size={18} color="#000000" /> Continue with TikTok
          </button>

          <button 
            type="button"
            className="btn-ghost" 
            style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', border: '1px solid var(--border)', padding: '12px', borderRadius: '8px', cursor: 'pointer', background: 'transparent' }}
            onClick={() => handleOAuthSignIn('snapchat')}
          >
            <SiSnapchat size={18} color="#FFFC00" /> Continue with Snapchat
          </button>

        </div>
        </div>
    </div>
  );
}