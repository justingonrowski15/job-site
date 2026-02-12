import Image from 'next/image';

type Company = {
  id: number;
  name: string;
  description: string | null;
  image: string | null;
};

export default function CompanyGrid({ companies }: { companies: Company[] }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '2rem',
      }}
    >
      {companies.map((company) => (
        <div
          key={company.id}
          style={{
            backgroundColor: '#fff',
            borderRadius: '8px',
            padding: '2rem',
            textAlign: 'center',
            border: '1px solid #e5e5e5',
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              margin: '0 auto 1rem',
              borderRadius: '50%',
              overflow: 'hidden',
            }}
          >
            <Image
              src={company.image || '/images/Weblinx Solution-company.png'}
              alt={company.name}
              width={80}
              height={80}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            {company.name}
          </h3>
          <p
            style={{
              fontSize: '0.875rem',
              color: '#666',
              lineHeight: 1.5,
              marginBottom: '1rem',
            }}
          >
            {company.description || 'No description available.'}
          </p>
          <button
            type="button"
            style={{
              padding: '0.5rem 1.25rem',
              backgroundColor: '#2d2d2d',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '0.875rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            View Details
          </button>
        </div>
      ))}
    </div>
  );
}
