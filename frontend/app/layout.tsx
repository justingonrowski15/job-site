import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Zenith Staff Source - Smart Staffing For A Smarter Workforce',
  description: 'Streamline Workforce Management, From Hiring To Clocking Out.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
