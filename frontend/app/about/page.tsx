import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <section style={{ padding: '5rem 4rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
              <div style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden' }}>
                <Image
                  src="/images/about-us_img.jpg"
                  alt="About Us"
                  width={600}
                  height={400}
                  style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                />
              </div>
              <div>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1.5rem', color: '#1a1a1a' }}>
                  About Us
                </h1>
                <p style={{ marginBottom: '1rem', lineHeight: 1.7, color: '#444' }}>
                  ZenithStaffSource was founded in 2020 with a vision to transform how job seekers and
                  employers connect. Today, we have grown into a trusted platform that serves thousands
                  of professionals and businesses. Our mission is to provide a seamless, transparent,
                  and efficient experience for everyone—whether you are looking for your next opportunity
                  or seeking top talent for your team.
                </p>
                <p style={{ marginBottom: '1rem', lineHeight: 1.7, color: '#444' }}>
                  We believe in the power of innovation, transparency, and quality service. From
                  seamless job matching to insightful resources and dedicated support, we are committed
                  to creating an inclusive environment where both professionals and businesses can thrive.
                  Join us as we continue to innovate and redefine the future of work.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section style={{ padding: '4rem 4rem', backgroundColor: '#f9f9f9' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2
              style={{
                fontSize: '2rem',
                fontWeight: 700,
                marginBottom: '1rem',
                color: '#333',
              }}
            >
              Ready to Join ZenithStaffSource?
            </h2>
            <p style={{ marginBottom: '2rem', lineHeight: 1.7, color: '#555' }}>
              Whether you are a job seeker looking for your next opportunity or an employer seeking
              top talent, our platform is designed to make connections effortless and meaningful. Take
              the next step and be part of a community that values innovation, trust, and support.
            </p>
            <Link
              href="/register"
              style={{
                display: 'inline-block',
                padding: '0.75rem 2rem',
                backgroundColor: '#1a1a1a',
                color: '#fff',
                borderRadius: '6px',
                fontWeight: 600,
                fontSize: '1rem',
              }}
            >
              Get Started
            </Link>
          </div>
        </section>

        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
