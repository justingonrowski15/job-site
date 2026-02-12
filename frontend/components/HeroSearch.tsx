'use client';

import { useState } from 'react';

type HeroSearchProps = {
  variant: 'home' | 'jobs' | 'companies';
};

export default function HeroSearch({ variant }: HeroSearchProps) {
  const [search, setSearch] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [careerLevel, setCareerLevel] = useState('');
  const [shiftType, setShiftType] = useState('');

  if (variant === 'home') {
    return (
      <div
        style={{
          backgroundColor: 'transparent',
          padding: '1.5rem',
          maxWidth: '800px',
          margin: '0 auto',
        }}
      >
        <p style={{ color: '#fff', marginBottom: '1rem', fontWeight: 600 }}>Search Jobs</p>
        <div
          style={{
            display: 'flex',
            gap: '0.75rem',
            flexWrap: 'wrap',
          }}
        >
          <select
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            style={{
              flex: 1,
              minWidth: '150px',
              padding: '0.75rem 1rem',
              backgroundColor: '#2d2d2d',
              border: '1px solid #444',
              borderRadius: '6px',
              color: '#fff',
            }}
          >
            <option value="">Job Title</option>
            <option value="designer">Designer</option>
            <option value="developer">Developer</option>
            <option value="plumber">Plumber</option>
          </select>
          <select
            value={careerLevel}
            onChange={(e) => setCareerLevel(e.target.value)}
            style={{
              flex: 1,
              minWidth: '150px',
              padding: '0.75rem 1rem',
              backgroundColor: '#2d2d2d',
              border: '1px solid #444',
              borderRadius: '6px',
              color: '#fff',
            }}
          >
            <option value="">Career Level</option>
            <option value="entry">Entry</option>
            <option value="mid">Mid</option>
            <option value="senior">Senior</option>
          </select>
          <select
            value={shiftType}
            onChange={(e) => setShiftType(e.target.value)}
            style={{
              flex: 1,
              minWidth: '150px',
              padding: '0.75rem 1rem',
              backgroundColor: '#2d2d2d',
              border: '1px solid #444',
              borderRadius: '6px',
              color: '#fff',
            }}
          >
            <option value="">Shift Type</option>
            <option value="full">Full-time</option>
            <option value="part">Part-time</option>
          </select>
          <button
            type="button"
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#e5e5e5',
              color: '#1a1a1a',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Search
          </button>
        </div>
      </div>
    );
  }

  if (variant === 'jobs') {
    return (
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
        <input
          type="text"
          placeholder="Enter skills or job title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            minWidth: '200px',
            padding: '0.75rem 1rem',
            backgroundColor: 'rgba(255,255,255,0.9)',
            border: '1px solid #ddd',
            borderRadius: '6px',
          }}
        />
        <select
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          style={{
            padding: '0.75rem 1rem',
            backgroundColor: 'rgba(255,255,255,0.9)',
            border: '1px solid #ddd',
            borderRadius: '6px',
            minWidth: '140px',
          }}
        >
          <option value="">Job title</option>
        </select>
        <select
          value={careerLevel}
          onChange={(e) => setCareerLevel(e.target.value)}
          style={{
            padding: '0.75rem 1rem',
            backgroundColor: 'rgba(255,255,255,0.9)',
            border: '1px solid #ddd',
            borderRadius: '6px',
            minWidth: '140px',
          }}
        >
          <option value="">Career Level</option>
        </select>
        <select
          value={shiftType}
          onChange={(e) => setShiftType(e.target.value)}
          style={{
            padding: '0.75rem 1rem',
            backgroundColor: 'rgba(255,255,255,0.9)',
            border: '1px solid #ddd',
            borderRadius: '6px',
            minWidth: '140px',
          }}
        >
          <option value="">Shift Type</option>
        </select>
        <button
          type="button"
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#1a1a1a',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Search
        </button>
      </div>
    );
  }

  // companies
  return (
    <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
      <input
        type="text"
        placeholder="Search company"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          flex: 1,
          padding: '0.75rem 1rem',
          backgroundColor: 'rgba(255,255,255,0.9)',
          border: '1px solid #ddd',
          borderRadius: '6px',
        }}
      />
      <button
        type="button"
        style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: '#2d2d2d',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        Search
      </button>
    </div>
  );
}
