import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';
import HeroSearch from '@/components/HeroSearch';
import JobList from '@/components/JobList';
import Image from 'next/image';

export default async function JobsPage() {
  let jobs: Array<{
    id: number;
    title: string;
    company_name: string;
    employment_type: string;
    experience: string;
    image: string | null;
  }> = [];

  try {
    const res = await fetch('http://localhost:3001/api/jobs', { cache: 'no-store' });
    jobs = await res.json();
  } catch {
    // Fallback data when backend not running
    jobs = [
      { id: 1, title: 'Designers', company_name: 'Weblinx Solution', employment_type: 'Full Time/Permanent', experience: '3 Year', image: '/images/designer-job.jpg' },
      { id: 2, title: 'Weight Losss', company_name: 'Demo Ten', employment_type: 'Dignissimos iusto ad', experience: '4 months', image: '/images/weight-job.jpg' },
      { id: 3, title: 'Plumber', company_name: 'Weblinx Solution', employment_type: 'Full-time', experience: '3 Year', image: '/images/plumber-job.jpg' },
      { id: 4, title: 'Web Development', company_name: 'VPN Alex Connor', employment_type: 'Full-time', experience: '5 Years', image: '/images/web development-job.jpeg' },
      { id: 5, title: 'Full Stack Developer', company_name: 'Eagan Dalton', employment_type: 'Full-time', experience: '3 Year', image: '/images/fullstack developer-job.webp' },
      { id: 6, title: 'Frontend developer', company_name: 'Eagan Dalton', employment_type: 'Full-time', experience: '3 Year', image: '/images/frontend-developer-job.webp' },
      { id: 7, title: 'Devops Engineer', company_name: 'Mohsin Employer', employment_type: 'Full-time', experience: '3 Year', image: '/images/devops-engineer-job.png' },
      { id: 8, title: 'Mri job', company_name: 'DONALD THOMPSON', employment_type: 'Full-time', experience: 'Entry', image: '/images/Mri-job.png' },
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
              src="/images/Jobs_header.jpg"
              alt=""
              fill
              style={{ objectFit: 'cover', filter: 'brightness(0.5)' }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(0,0,0,0.4)',
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
            <HeroSearch variant="jobs" />
          </div>
        </section>

        <section style={{ padding: '4rem 4rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <JobList jobs={jobs} />
          </div>
        </section>

        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
