import Image from 'next/image';
import Link from 'next/link';

type Job = {
  id: number;
  title: string;
  company_name: string;
  employment_type: string;
  experience: string;
  image: string | null;
};

export default function JobList({ jobs }: { jobs: Job[] }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '1.5rem',
      }}
    >
      {jobs.map((job) => (
        <div
          key={job.id}
          style={{
            display: 'flex',
            gap: '1rem',
            padding: '1.25rem',
            backgroundColor: '#fff',
            borderRadius: '8px',
            border: '1px solid #e5e5e5',
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              flexShrink: 0,
              borderRadius: '8px',
              overflow: 'hidden',
            }}
          >
            <Image
              src={job.image || '/images/developer.jpg'}
              alt={job.title}
              width={80}
              height={80}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.25rem' }}>
              {job.title}
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem' }}>
              {job.company_name}
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
              <span
                style={{
                  padding: '0.25rem 0.5rem',
                  backgroundColor: '#f0f0f0',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                }}
              >
                {job.employment_type}
              </span>
              <span
                style={{
                  padding: '0.25rem 0.5rem',
                  backgroundColor: '#f0f0f0',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                }}
              >
                Experience: {job.experience}
              </span>
            </div>
            <Link
              href={`/jobs/${job.id}`}
              style={{
                display: 'inline-block',
                padding: '0.4rem 1rem',
                backgroundColor: '#2d2d2d',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                fontSize: '0.8125rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              VIEW DETAILS
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
