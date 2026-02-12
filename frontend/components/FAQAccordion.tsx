'use client';

import { useState } from 'react';

const faqs = [
  {
    q: 'Can employees track expired certificates?',
    a: 'Yes! Our system alerts them automatically.',
  },
  {
    q: 'Does it support multiple shifts per day?',
    a: 'Absolutely. Our platform supports flexible shift configurations.',
  },
  {
    q: 'How secure is employee data?',
    a: 'All data is encrypted and access-controlled.',
  },
  {
    q: 'Is there a free trial?',
    a: 'Yes, we offer a 14-day free trial for new users.',
  },
];

export default function FAQAccordion() {
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set([0, 2]));

  const toggle = (i: number) => {
    setOpenIndices((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {faqs.map((faq, i) => (
        <div
          key={i}
          style={{
            backgroundColor: '#2d2d2d',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <button
            type="button"
            onClick={() => toggle(i)}
            style={{
              width: '100%',
              padding: '1rem 1.25rem',
              backgroundColor: 'transparent',
              border: 'none',
              color: '#fff',
              fontSize: '1rem',
              textAlign: 'left',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            {faq.q}
            <span style={{ fontSize: '1.25rem' }}>{openIndices.has(i) ? '−' : '+'}</span>
          </button>
          {openIndices.has(i) && (
            <div
              style={{
                padding: '0 1.25rem 1rem',
                color: '#b0b0b0',
                fontSize: '0.9375rem',
              }}
            >
              {faq.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
