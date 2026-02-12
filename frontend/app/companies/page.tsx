import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';
import HeroSearch from '@/components/HeroSearch';
import CompanyGrid from '@/components/CompanyGrid';
import Image from 'next/image';

export default async function CompaniesPage() {
  let companies: Array<{
    id: number;
    name: string;
    description: string | null;
    image: string | null;
  }> = [];

  try {
    const res = await fetch('http://localhost:3001/api/companies', { cache: 'no-store' });
    companies = await res.json();
  } catch {
    companies = [
      { id: 1, name: 'Weblinx Solution', description: 'Leading provider of high-quality glass solutions for homes and businesses.', image: '/images/Weblinx Solution-company.png' },
      { id: 2, name: 'Demo Ten', description: 'We are a technology-driven company providing innovative IT solutions that empower business.', image: '/images/Demo Ten-company.jpg' },
      { id: 3, name: 'John Doe', description: 'hi, i am employer and i hire talented individuals', image: '/images/John Doe-company.jpg' },
      { id: 4, name: 'Alex Connor', description: 'Vero omnis exercitat', image: '/images/Alex Connor-company.webp' },
      { id: 5, name: 'Eagan Dalton', description: 'Technology and innovation company', image: '/images/Eagan Dalton-company.webp' },
      { id: 6, name: 'Mohsin Employer', description: 'Growing tech company seeking talent', image: '/images/Mohsin Employer-company.png' },
      { id: 7, name: 'DONALD THOMPSON', description: 'Professional staffing solutions', image: '/images/DONALD THOMPSON-company.jpg' },
    ];
  }

  return (
    <>
      <Header />
      <main>
        <section
          style={{
            position: 'relative',
            padding: '5rem 4rem',
            minHeight: '320px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 0,
            }}
          >
            <Image
              src="/images/employees.jpg"
              alt=""
              fill
              style={{ objectFit: 'cover', filter: 'brightness(0.6)' }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(30, 60, 90, 0.5)',
              }}
            />
          </div>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h1
              style={{
                fontSize: '2.5rem',
                fontWeight: 700,
                color: '#fff',
                marginBottom: '1rem',
              }}
            >
              Let&apos;s Get To Work Today!
            </h1>
            <HeroSearch variant="companies" />
          </div>
        </section>

        <section style={{ padding: '4rem 4rem' }}>
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
              Our Partner Companies
            </h2>
            <CompanyGrid companies={companies} />
          </div>
        </section>

        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
