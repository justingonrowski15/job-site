import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type JobDetail = {
  id: number;
  title: string;
  company_name: string;
  company_id?: number;
  employment_type: string;
  experience: string;
  image: string | null;
  location: string | null;
  shift: string | null;
  career_level: string | null;
  positions: string | null;
  degree: string | null;
  apply_before: string | null;
  date_posted: string | null;
  description: string | null;
  skills: string | null;
  benefits: string | null;
};

function getApiUrl(path: string): string {
  const base = process.env.API_URL || 'http://localhost:3001';
  return `${base}${path}`;
}

async function getJob(id: string): Promise<JobDetail | null> {
  try {
    const res = await fetch(getApiUrl(`/api/jobs/${id}`), { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch (err) {
    console.error('getJob error:', err);
    return null;
  }
}

async function getSimilarJobs(excludeId: number): Promise<Array<{ id: number; title: string; company_name: string; employment_type: string }>> {
  try {
    const res = await fetch(getApiUrl('/api/jobs'), { cache: 'no-store' });
    if (!res.ok) return [];
    const jobs = await res.json();
    return jobs.filter((j: { id: number }) => j.id !== excludeId).slice(0, 4);
  } catch {
    return [];
  }
}

export default async function JobDetailPage({ params }: { params: { id: string } }) {
  const job = await getJob(params.id);
  if (!job) notFound();

  const similarJobs = await getSimilarJobs(job.id);

  const skillsList = job.skills ? (typeof job.skills === 'string' && job.skills.startsWith('[') ? JSON.parse(job.skills) : [job.skills]) : [];
  const benefitsList = job.benefits ? (typeof job.benefits === 'string' && job.benefits.startsWith('[') ? JSON.parse(job.benefits) : []) : [];

  const jobData = job as JobDetail & { work_location?: string };
  const detailItems = [
    { label: 'Location', value: job.location || 'Not specified' },
    { label: 'Company', value: job.company_name },
    { label: 'Type', value: job.employment_type },
    { label: 'Shift', value: job.shift || 'Not specified' },
    { label: 'Career Level', value: job.career_level || 'Not specified' },
    { label: 'Positions', value: job.positions || 'Not specified' },
    { label: 'Experience', value: job.experience },
    { label: 'Degree', value: job.degree || 'Not specified' },
    { label: 'Work Location', value: jobData.work_location || 'Not specified' },
    { label: 'Apply Before', value: job.apply_before || 'Not specified' },
  ];

  const benefitIcons: Record<string, string> = {
    salary: '💰',
    flexible: '🕒',
    creative: '🚀',
    learning: '📚',
    pto: '🏖️',
    collab: '🤝',
    career: '💼',
  };

  return (
    <>
      <Header />
      <main style={{ backgroundColor: '#f5f5f5', paddingBottom: '2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 4rem' }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '2rem', marginBottom: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
              <div>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem', color: '#1a1a1a' }}>
                  {job.title} - {job.company_name}
                </h1>
                <p style={{ fontSize: '0.875rem', color: '#666' }}>
                  Date Posted: {job.date_posted || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
              <Link
                href="/login"
                style={{
                  padding: '0.5rem 1.25rem',
                  backgroundColor: '#2d2d2d',
                  color: '#fff',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                }}
              >
                Login to Apply
              </Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '2rem' }}>
              <div>
                <div style={{ marginBottom: '2rem' }}>
                  {detailItems.map((item, i) => (
                    <div key={i} style={{ display: 'flex', padding: '0.5rem 0', borderBottom: '1px solid #eee', gap: '1rem' }}>
                      <span style={{ fontWeight: 600, minWidth: '130px', color: '#333' }}>{item.label}:</span>
                      <span style={{ color: '#555' }}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ backgroundColor: '#f9f9f9', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem' }}>Company Overview</h3>
                  <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{job.company_name}</p>
                  <p style={{ fontSize: '0.875rem', color: '#666' }}>2 Current Job Opening</p>
                </div>
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem' }}>Related Jobs</h3>
                  <p style={{ fontSize: '0.875rem', color: '#888' }}>Google Map</p>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.25rem' }}>💡</span> Job Description
              </h3>
              <p style={{ fontWeight: 600, marginBottom: '0.5rem' }}>{job.title} - Job Description</p>
              {job.description ? (
                <>
                  <p style={{ lineHeight: 1.7, color: '#444' }}>{job.description}</p>
                  {job.title.toLowerCase().includes('designer') && (
                    <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem', lineHeight: 1.8, color: '#444' }}>
                      <li>Develop creative concepts and visuals aligned with brand strategy.</li>
                      <li>Design digital materials such as social media posts, web banners, brochures, and presentations.</li>
                      <li>Collaborate with developers and marketers to ensure high-quality final products.</li>
                      <li>Maintain brand consistency across all visual assets.</li>
                      <li>Stay updated with the latest design trends, tools, and technologies.</li>
                      <li>Prepare mockups, prototypes, and final artwork for campaigns or apps.</li>
                    </ul>
                  )}
                </>
              ) : (
                <p style={{ lineHeight: 1.7, color: '#444' }}>
                  Join {job.company_name} as a {job.title}. This is a {job.employment_type} position requiring {job.experience} of experience. Apply today to learn more about this opportunity.
                </p>
              )}
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.25rem' }}>🎓</span> Skills & Qualifications
              </h3>
              {skillsList.length > 0 ? (
                <ul style={{ paddingLeft: '1.5rem', lineHeight: 1.8, color: '#444' }}>
                  {skillsList.map((s: string, i: number) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              ) : (
                <p style={{ lineHeight: 1.7, color: '#444' }}>Relevant experience and qualifications for this role. Please apply to learn more.</p>
              )}
            </div>

            <div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.25rem' }}>✨</span> Job Benefits
              </h3>
              <p style={{ fontWeight: 600, marginBottom: '1rem' }}>Benefits</p>
              {benefitsList.length > 0 ? (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {benefitsList.map((b: { title: string; desc: string; icon?: string }, i: number) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      <span>{benefitIcons[b.icon || ''] || '•'}</span>
                      <span><strong>{b.title}</strong> {b.desc}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ lineHeight: 1.7, color: '#444' }}>Competitive benefits package. Details provided during the interview process.</p>
              )}
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>Similar Jobs You May Like</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {similarJobs.map((sj: { id: number; title: string; company_name: string; employment_type: string }) => (
                <div
                  key={sj.id}
                  style={{
                    backgroundColor: '#fff',
                    padding: '1.5rem',
                    borderRadius: '8px',
                    border: '1px solid #e5e5e5',
                  }}
                >
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.25rem' }}>{sj.title} - {sj.company_name}</h4>
                  <p style={{ fontSize: '0.8125rem', color: '#666', marginBottom: '1rem' }}>
                    {sj.employment_type} | Recently
                  </p>
                  <Link
                    href={`/jobs/${sj.id}`}
                    style={{
                      display: 'inline-block',
                      padding: '0.4rem 1rem',
                      backgroundColor: '#2d2d2d',
                      color: '#fff',
                      borderRadius: '6px',
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                    }}
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
