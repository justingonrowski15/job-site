'use client';

import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');

  return (
    <section
      style={{
        backgroundColor: '#1a1a1a',
        padding: '3rem 4rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '2rem',
        flexWrap: 'wrap',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: '50%',
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30L30 0z' fill='%23333' fill-opacity='0.3'/%3E%3C/svg%3E")`,
          opacity: 0.5,
        }}
      />
      <h2
        style={{
          color: '#fff',
          fontSize: '1.5rem',
          fontWeight: 700,
          position: 'relative',
          zIndex: 1,
        }}
      >
        Sign Up to get updates & news about{' '}
        <span style={{ backgroundColor: '#333', padding: '0 0.25rem' }}>Us</span>
      </h2>
      <div
        style={{
          display: 'flex',
          gap: 0,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: '0.75rem 1.25rem',
            border: 'none',
            borderRadius: '6px 0 0 6px',
            fontSize: '0.9375rem',
            minWidth: '250px',
          }}
        />
        <button
          type="button"
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#2d2d2d',
            color: '#fff',
            border: 'none',
            borderRadius: '0 6px 6px 0',
            fontSize: '0.9375rem',
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          Subscribe
        </button>
      </div>
    </section>
  );
}
