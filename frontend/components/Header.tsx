'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const isDarkHeader = pathname === '/' || pathname === '/jobs' || pathname === '/companies';

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem 4rem',
        backgroundColor: isDarkHeader ? '#1a1a1a' : '#ffffff',
        borderBottom: isDarkHeader ? 'none' : '1px solid #e5e5e5',
      }}
    >
      <Link href="/" style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
        <span
          style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: isDarkHeader ? '#fff' : '#1a1a1a',
            letterSpacing: '0.05em',
          }}
        >
          ZENITH
        </span>
        <span
          style={{
            fontSize: '0.875rem',
            fontWeight: 400,
            color: isDarkHeader ? '#fff' : '#1a1a1a',
            letterSpacing: '0.05em',
          }}
        >
          STAFF SOURCE
        </span>
      </Link>

      <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <Link
          href="/"
          style={{
            color: isDarkHeader ? '#fff' : '#1a1a1a',
            fontWeight: pathname === '/' ? 600 : 400,
            fontSize: '0.9375rem',
          }}
        >
          Home
        </Link>
        <Link
          href="/jobs"
          style={{
            color: isDarkHeader ? '#fff' : '#1a1a1a',
            fontWeight: pathname === '/jobs' ? 600 : 400,
            fontSize: '0.9375rem',
          }}
        >
          Jobs
        </Link>
        <Link
          href="/companies"
          style={{
            color: isDarkHeader ? '#fff' : '#1a1a1a',
            fontWeight: pathname === '/companies' ? 600 : 400,
            fontSize: '0.9375rem',
          }}
        >
          Companies
        </Link>
        <Link
          href="/about"
          style={{
            color: isDarkHeader ? '#fff' : '#1a1a1a',
            fontWeight: pathname === '/about' ? 600 : 400,
            fontSize: '0.9375rem',
          }}
        >
          About Us
        </Link>
      </nav>

      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <Link
          href="/login"
          style={{
            padding: '0.5rem 1.25rem',
            backgroundColor: isDarkHeader ? '#2d2d2d' : '#1a1a1a',
            color: '#fff',
            borderRadius: '6px',
            fontSize: '0.9375rem',
            fontWeight: 500,
          }}
        >
          Login
        </Link>
        <Link
          href="/register"
          style={{
            padding: '0.5rem 1.25rem',
            backgroundColor: isDarkHeader ? '#2d2d2d' : '#1a1a1a',
            color: '#fff',
            borderRadius: '6px',
            fontSize: '0.9375rem',
            fontWeight: 500,
          }}
        >
          Register
        </Link>
      </div>
    </header>
  );
}
