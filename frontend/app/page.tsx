import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';
import Image from 'next/image';
import HeroSearch from '@/components/HeroSearch';
import FAQAccordion from '@/components/FAQAccordion';
import CanvasParticlesSection from '@/components/CanvasParticlesSection';
import TestimonialSlideshow from '@/components/TestimonialSlideshow';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section
          style={{
            backgroundColor: '#1a1a1a',
            padding: '5rem 4rem',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <CanvasParticlesSection id="hero-particles" />
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
            <h1
              style={{
                fontSize: '3rem',
                fontWeight: 700,
                color: '#fff',
                marginBottom: '1rem',
                lineHeight: 1.2,
              }}
            >
              Smart Staffing For A{' '}
              <span style={{ backgroundColor: '#333', padding: '0 0.5rem' }}>Smarter</span> Workforce
            </h1>
            <p style={{ color: '#fff', fontSize: '1.125rem', marginBottom: '2rem', opacity: 0.9 }}>
              Streamline Workforce Management, From Hiring To Clocking Out.
            </p>
            <HeroSearch variant="home" />
          </div>
        </section>

        {/* Employee Flow */}
        <section style={{ padding: '5rem 4rem', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden' }}>
              <Image
                src="/images/employees.jpg"
                alt="Employee Flow"
                width={600}
                height={400}
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
              />
            </div>
            <div>
              <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1.5rem', color: '#1a1a1a' }}>
                Employee <span style={{ backgroundColor: '#e5e5e5', padding: '0 0.25rem' }}>Flow</span>
              </h2>
              <p style={{ marginBottom: '1rem', lineHeight: 1.7, color: '#444' }}>
                Our Employee Flow is designed with a clean, interactive, and intuitive-focused approach to
                managing complex processes. Whether you are tracking your hours, requesting time off,
                or updating your profile, every action feels straightforward and hassle-free.
              </p>
              <p style={{ marginBottom: '1rem', lineHeight: 1.7, color: '#444' }}>
                One of the standout features is the ability to seamlessly toggle between Employee and
                Admin views. As an employee, you can easily Manage Your Work Life, view your schedule,
                and access all the tools you need in one centralized dashboard.
              </p>
            </div>
          </div>
        </section>

        {/* Admin Flow */}
        <section style={{ padding: '5rem 4rem', backgroundColor: '#f9f9f9' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
              <div>
                <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1.5rem', color: '#1a1a1a' }}>
                  Admin <span style={{ backgroundColor: '#e5e5e5', padding: '0 0.25rem' }}>Flow</span>
                </h2>
                <p style={{ marginBottom: '1rem', lineHeight: 1.7, color: '#444' }}>
                  The Admin Flow mirrors the structural simplicity of the Employee Flow but is built for
                  control, efficiency, and business functionality. Administrators can manage the entire
                  workforce from a single dashboard, with tools designed to streamline every aspect of
                  workforce management.
                </p>
                <p style={{ marginBottom: '1rem', lineHeight: 1.7, color: '#444' }}>
                  Key capabilities include the ability to Manage Employee Accounts, Assign Skills Via
                  Customization, and Monitor Attendance. Each feature is designed to reduce administrative
                  overhead while providing the visibility needed to make informed decisions.
                </p>
              </div>
              <div style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden' }}>
                <Image
                  src="/images/developer.jpg"
                  alt="Admin Flow"
                  width={600}
                  height={400}
                  style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Features */}
        <section
          style={{
            backgroundColor: '#1a1a1a',
            padding: '5rem 4rem',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <CanvasParticlesSection id="features-particles" />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto' }}>
            <h2
              style={{
                textAlign: 'center',
                fontSize: '2rem',
                fontWeight: 700,
                marginBottom: '3rem',
                color: '#fff',
              }}
            >
              Our <span style={{ backgroundColor: '#333', padding: '0 0.25rem' }}>Features</span>
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: '#fff',
                    padding: '2rem',
                    borderRadius: '8px',
                  }}
                >
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1rem', color: '#1a1a1a' }}>
                    Profile & Document Management
                  </h3>
                  <p style={{ fontSize: '0.9375rem', lineHeight: 1.6, color: '#444' }}>
                    Zenith makes onboarding and profile management seamless for employees. Each user can
                    easily complete their profile, upload resumes, certifications, and track document
                    expiry dates.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section style={{ padding: '5rem 4rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2
              style={{
                textAlign: 'center',
                fontSize: '2rem',
                fontWeight: 700,
                marginBottom: '3rem',
                color: '#1a1a1a',
              }}
            >
              What Our Users Say{' '}
              <span style={{ backgroundColor: '#e5e5e5', padding: '0 0.25rem' }}>Feedback</span>
            </h2>
            <TestimonialSlideshow />
          </div>
        </section>

        {/* FAQs */}
        <section
          style={{
            backgroundColor: '#1a1a1a',
            padding: '5rem 4rem',
            position: 'relative',
          }}
        >
          <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto' }}>
            <h2
              style={{
                textAlign: 'center',
                fontSize: '2rem',
                fontWeight: 700,
                marginBottom: '2rem',
                color: '#fff',
              }}
            >
              FAQs
            </h2>
            <FAQAccordion />
          </div>
        </section>

        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
