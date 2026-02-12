import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type CompanyDetail = {
  id: number;
  name: string;
  description: string | null;
  image: string | null;
  jobs: Array<{
    id: number;
    title: string;
    employment_type: string;
    experience: string;
    image: string | null;
    location: string | null;
    description: string | null;
  }>;
  member_since: string;
  email_verified: boolean;
  established_in: string;
};

function getApiUrl(path: string): string {
  const base = process.env.API_URL || 'http://localhost:3001';
  return `${base}${path}`;
}

async function getCompany(id: string): Promise<CompanyDetail | null> {
  try {
    const res = await fetch(getApiUrl(`/api/companies/${id}`), { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch (err) {
    console.error('getCompany error:', err);
    return null;
  }
}

export default async function CompanyDetailPage({ params }: { params: { id: string } }) {
  const company = await getCompany(params.id);
  if (!company) notFound();

  const jobSummary = (job: { description: string | null }, fallback: string) =>
    job.description ? (job.description.length > 120 ? job.description.slice(0, 120) + '...' : job.description) : fallback;

  return (
    <>
      <Header />
      <main style={{ backgroundColor: '#f5f5f5' }}>
        {/* Hero */}
        <section
          style={{
            backgroundColor: '#6b7280',
            padding: '3rem 4rem',
            textAlign: 'center',
          }}
        >
          <h1 style={{ fontSize: '2.25rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>
            {company.name}
          </h1>
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.9)' }}>
            Member Since, {company.member_since}
          </p>
        </section>

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 4rem' }}>
          {/* Company Overview */}
          <div
            style={{
              backgroundColor: '#fff',
              borderRadius: '8px',
              padding: '1.5rem 2rem',
              marginBottom: '2rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
            }}
          >
            <p style={{ lineHeight: 1.6, color: '#444' }}>
              {company.description || 'No description available.'}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '2rem' }}>
            {/* Job Openings */}
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', color: '#1a1a1a' }}>
                Job Openings
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {company.jobs.map((job) => (
                  <div
                    key={job.id}
                    style={{
                      backgroundColor: '#fff',
                      padding: '1.5rem',
                      borderRadius: '8px',
                      border: '1px solid #e5e5e5',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                    }}
                  >
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                      {job.title}
                    </h3>
                    <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem' }}>
                      {job.employment_type}
                    </p>
                    {job.location && (
                      <p style={{ fontSize: '0.875rem', color: '#555', marginBottom: '0.5rem' }}>
                        {job.location}
                      </p>
                    )}
                    <p
                      style={{
                        fontSize: '0.875rem',
                        color: '#666',
                        lineHeight: 1.5,
                        marginBottom: '1rem',
                      }}
                    >
                      {jobSummary(job, company.description || 'No description available.')}
                    </p>
                    <Link
                      href={`/jobs/${job.id}`}
                      style={{
                        display: 'inline-block',
                        padding: '0.5rem 1.25rem',
                        backgroundColor: '#6b7280',
                        color: '#fff',
                        borderRadius: '6px',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                      }}
                    >
                      VIEW DETAIL
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Company Details Sidebar */}
            <div>
              <div
                style={{
                  backgroundColor: '#fff',
                  padding: '1.5rem',
                  borderRadius: '8px',
                  border: '1px solid #e5e5e5',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                }}
              >
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1rem' }}>
                  Company Details
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <p style={{ fontSize: '0.9375rem', color: '#444' }}>
                    Email Verified: {company.email_verified ? 'Yes' : 'No'}
                  </p>
                  <p style={{ fontSize: '0.9375rem', color: '#444' }}>
                    Established In: {company.established_in}
                  </p>
                  <p style={{ fontSize: '0.9375rem', color: '#444' }}>
                    Current Jobs: {company.jobs.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
