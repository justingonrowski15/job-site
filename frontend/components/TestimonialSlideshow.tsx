'use client';

import { useState, useEffect } from 'react';

const testimonials = [
  { name: 'Marcus Williams', title: 'Frontend Developer', avatar: '/images/avatar1.png', quote: 'Zenith Staff Source made my job search so much easier. The platform is intuitive and I found my dream role within weeks.' },
  { name: 'Emily Chen', title: 'HR Manager', avatar: '/images/avatar5.jpg', quote: 'We have hired over twenty candidates through Zenith. The quality of matches and ease of scheduling interviews is unmatched.' },
  { name: 'James Foster', title: 'DevOps Engineer', avatar: '/images/avatar3.jpg', quote: 'The document management and certificate tracking saved me hours. My expired certs are flagged automatically, no more last-minute scrambles.' },
  { name: 'Priya Patel', title: 'Talent Acquisition Lead', avatar: '/images/avatar4.jpg', quote: 'Excellent staffing platform. The Admin Flow gives us full visibility into our workforce. Attendance and skills data in one place.' },
  { name: 'Sofia Rivera', title: 'Project Coordinator', avatar: '/images/avatar2.jpg', quote: 'As someone who switched careers, Zenith\'s resources and support were invaluable. The team really cares about your success.' },
];

export default function TestimonialSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const totalSlides = testimonials.length - 2;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(interval);
  }, [totalSlides]);

  const goPrev = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  const goNext = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <button
        type="button"
        onClick={goPrev}
        aria-label="Previous slide"
        style={{
          position: 'absolute',
          left: '0.5rem',
          top: '50%',
          transform: 'translateY(-50%)',
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '1px solid #e5e5e5',
          backgroundColor: '#fff',
          cursor: 'pointer',
          fontSize: '1.25rem',
          zIndex: 2,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        ‹
      </button>
      <button
        type="button"
        onClick={goNext}
        aria-label="Next slide"
        style={{
          position: 'absolute',
          right: '0.5rem',
          top: '50%',
          transform: 'translateY(-50%)',
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '1px solid #e5e5e5',
          backgroundColor: '#fff',
          cursor: 'pointer',
          fontSize: '1.25rem',
          zIndex: 2,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        ›
      </button>
      <div
        style={{
          display: 'flex',
          gap: '2rem',
          transition: 'transform 0.4s ease-out',
          transform: `translateX(calc(-${currentSlide} * ((100% - 4rem) / 3 + 2rem)))`,
        }}
      >
        {testimonials.map((t, i) => (
          <div
            key={i}
            style={{
              flex: '0 0 calc((100% - 4rem) / 3)',
              backgroundColor: '#fff',
              padding: '2rem',
              borderRadius: '8px',
              border: '1px solid #e5e5e5',
              position: 'relative',
            }}
          >
            <div style={{ marginBottom: '1rem' }}>{'★'.repeat(5)}</div>
            <p style={{ marginBottom: '1.5rem', lineHeight: 1.6, color: '#444', fontSize: '0.9375rem' }}>
              {t.quote}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <img
                src={t.avatar}
                alt={t.name}
                width={40}
                height={40}
                style={{ borderRadius: '50%', objectFit: 'cover' }}
              />
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{t.name}</div>
                <div style={{ fontSize: '0.8125rem', color: '#666' }}>{t.title}</div>
              </div>
            </div>
            <span style={{ position: 'absolute', bottom: '1rem', right: '1rem', fontSize: '2rem', opacity: 0.2 }}>"</span>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '2rem' }}>
        {Array.from({ length: totalSlides }).map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrentSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: currentSlide === i ? '#1a1a1a' : '#ccc',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}
