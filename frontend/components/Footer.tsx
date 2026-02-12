import Link from 'next/link';

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#1a1a1a',
        color: '#fff',
        padding: '4rem 4rem 2rem',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr 1.5fr',
          gap: '3rem',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <div>
          <div style={{ marginBottom: '1rem' }}>
            <span style={{ fontSize: '1.25rem', fontWeight: 700 }}>ZENITH</span>
            <span style={{ fontSize: '0.875rem', display: 'block' }}>STAFF SOURCE</span>
          </div>
          <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: '#b0b0b0' }}>
            Jorem Ipsum Dolor Sit Amet, Consectetur Adipiscing elit. Nunc vulputate libero et
            velit interdum, ac aliquet odio mattis.
          </p>
        </div>

        <div>
          <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>Navigation</h4>
          <ul style={{ listStyle: 'none' }}>
            {['Home', 'Employee Flow', 'Admin Flow', 'Features', 'Testimonials', 'FAQs'].map(
              (item) => (
                <li key={item} style={{ marginBottom: '0.5rem' }}>
                  <Link href={item === 'Home' ? '/' : '#'} style={{ color: '#fff', fontSize: '0.875rem' }}>
                    {item}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>

        <div>
          <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>Quick Link</h4>
          <ul style={{ listStyle: 'none' }}>
            <li style={{ marginBottom: '0.5rem' }}>
              <Link href="#" style={{ color: '#fff', fontSize: '0.875rem' }}>Terms & condition</Link>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <Link href="#" style={{ color: '#fff', fontSize: '0.875rem' }}>Privacy policy</Link>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <Link href="#" style={{ color: '#fff', fontSize: '0.875rem' }}>Contact us</Link>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <Link href="/" style={{ color: '#fff', fontSize: '0.875rem' }}>Home</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>Get In Touch</h4>
          <div style={{ fontSize: '0.875rem', lineHeight: 2 }}>
            <p>📞 123 456 789</p>
            <p>📍 Vorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            <p>✉️ abc123@gmail.com</p>
          </div>
        </div>
      </div>

      <div
        style={{
          textAlign: 'center',
          paddingTop: '2rem',
          marginTop: '2rem',
          borderTop: '1px solid #333',
          color: '#888',
          fontSize: '0.8125rem',
        }}
      >
        Copyright © 2026 Zenith. All Rights Reserved.
      </div>
    </footer>
  );
}
