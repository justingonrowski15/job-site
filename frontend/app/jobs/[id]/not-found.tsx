import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function JobNotFound() {
  return (
    <>
      <Header />
      <main style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Job Not Found</h1>
        <p style={{ color: '#666', marginBottom: '1.5rem' }}>
          The job you are looking for does not exist or may have been removed.
        </p>
        <Link
          href="/jobs"
          style={{
            padding: '0.5rem 1.25rem',
            backgroundColor: '#2d2d2d',
            color: '#fff',
            borderRadius: '6px',
            fontWeight: 600,
          }}
        >
          Back to Jobs
        </Link>
      </main>
      <Footer />
    </>
  );
}
