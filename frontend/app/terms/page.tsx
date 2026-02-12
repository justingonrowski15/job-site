import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';

export default function TermsPage() {
  return (
    <>
      <Header />
      <main>
        <section style={{ padding: '4rem 4rem', backgroundColor: '#f5f5f5' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '2.25rem', fontWeight: 700, marginBottom: '0.5rem', color: '#1a1a1a' }}>
              Terms & Conditions
            </h1>
            <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '2.5rem' }}>
              Last updated: February 2026
            </p>

            <div style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '2.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
              <div style={{ fontSize: '0.9375rem', lineHeight: 1.8, color: '#444' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: '2rem', marginBottom: '0.75rem', color: '#1a1a1a' }}>
                  1. Acceptance of Terms
                </h2>
                <p style={{ marginBottom: '1rem' }}>
                  By accessing and using Zenith Staff Source (“the Service”), you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our platform.
                </p>

                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: '2rem', marginBottom: '0.75rem', color: '#1a1a1a' }}>
                  2. Use of Service
                </h2>
                <p style={{ marginBottom: '1rem' }}>
                  Zenith Staff Source provides a platform for job seekers and employers to connect. You agree to use the Service only for lawful purposes and in accordance with these terms. You must not use the Service to post false information, harass others, or violate any applicable laws.
                </p>

                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: '2rem', marginBottom: '0.75rem', color: '#1a1a1a' }}>
                  3. Accounts and Registration
                </h2>
                <p style={{ marginBottom: '1rem' }}>
                  To access certain features, you may need to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must provide accurate and complete information when registering.
                </p>

                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: '2rem', marginBottom: '0.75rem', color: '#1a1a1a' }}>
                  4. Job Listings and Applications
                </h2>
                <p style={{ marginBottom: '1rem' }}>
                  Employers are responsible for the accuracy of job postings. Job seekers are responsible for the accuracy of their applications and profiles. Zenith Staff Source does not guarantee placement, employment, or hiring outcomes. We are not a party to any employment relationship formed through the platform.
                </p>

                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: '2rem', marginBottom: '0.75rem', color: '#1a1a1a' }}>
                  5. User Conduct
                </h2>
                <p style={{ marginBottom: '1rem' }}>
                  You agree not to: misuse the Service, attempt to gain unauthorized access to systems or data, transmit malware, impersonate others, or engage in any activity that disrupts or harms the Service or other users.
                </p>

                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: '2rem', marginBottom: '0.75rem', color: '#1a1a1a' }}>
                  6. Intellectual Property
                </h2>
                <p style={{ marginBottom: '1rem' }}>
                  The content, design, and branding of Zenith Staff Source are owned by us or our licensors. You may not copy, modify, or distribute our content without prior written permission.
                </p>

                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: '2rem', marginBottom: '0.75rem', color: '#1a1a1a' }}>
                  7. Disclaimer
                </h2>
                <p style={{ marginBottom: '1rem' }}>
                  The Service is provided “as is” without warranties of any kind. We do not warrant that the Service will be uninterrupted, error-free, or secure. You use the Service at your own risk.
                </p>

                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: '2rem', marginBottom: '0.75rem', color: '#1a1a1a' }}>
                  8. Limitation of Liability
                </h2>
                <p style={{ marginBottom: '1rem' }}>
                  To the fullest extent permitted by law, Zenith Staff Source shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Service.
                </p>

                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: '2rem', marginBottom: '0.75rem', color: '#1a1a1a' }}>
                  9. Changes to Terms
                </h2>
                <p style={{ marginBottom: '1rem' }}>
                  We may update these Terms and Conditions from time to time. We will notify you of material changes by posting the updated terms on this page. Your continued use of the Service after changes constitutes acceptance of the new terms.
                </p>

                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: '2rem', marginBottom: '0.75rem', color: '#1a1a1a' }}>
                  10. Contact
                </h2>
                <p style={{ marginBottom: '0' }}>
                  If you have questions about these Terms and Conditions, please contact us at dt.donthompson@gmail.com or use the contact information provided in the footer.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
