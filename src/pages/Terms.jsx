import SectionHeading from '../components/SectionHeading/SectionHeading';

const Terms = () => (
  <main className="page-content">
    <section className="page-hero legal-hero">
      <div className="container">
        <SectionHeading title="Terms of Service" subtitle="Important terms for using this website and working together." />
      </div>
    </section>
    <section className="container legal-page-copy">
      <p>Last updated: January 1, 2026</p>
      <h3>Acceptance</h3>
      <p>By contacting or hiring my services, you agree to the terms described on this website.</p>
      <h3>Scope</h3>
      <p>Services include website design, development, consultation and maintenance.</p>
      <h3>Responsibility</h3>
      <p>All project outcomes depend on requirements, approvals, timelines and communication.</p>
      <h3>Contact</h3>
      <p>For terms questions, use the Contact page to reach out.</p>
    </section>
  </main>
);

export default Terms;
