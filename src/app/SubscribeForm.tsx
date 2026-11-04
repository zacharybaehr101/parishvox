'use client';

import { useState } from 'react';

export default function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus('done');
        setMessage('You are on the list — welcome to ParishVox.');
      } else {
        setStatus('error');
        setMessage(data.error ?? 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  }

  if (status === 'done') return <p>{message}</p>;

  return (
    <form onSubmit={submit} className="searchbar" style={{ maxWidth: '34rem' }}>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@youragency.com"
        aria-label="Email address"
      />
      <button className="btn" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Joining…' : 'Join the newsletter'}
      </button>
      {status === 'error' && <p style={{ flexBasis: '100%', color: 'var(--red)' }}>{message}</p>}
    </form>
  );
}
