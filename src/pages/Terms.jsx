import SectionHeading from '../components/SectionHeading/SectionHeading';
import { getSiteContent } from '../services/siteContentService';

const Terms = () => {
  const { pageCopy, legalContent } = getSiteContent();
  const termsSections = legalContent?.terms?.sections || [];

  return (
    <main className="page-content">
      <section className="page-hero legal-hero">
        <div className="container">
          <SectionHeading title={pageCopy.termsPage.title} subtitle={pageCopy.termsPage.subtitle} />
        </div>
      </section>
      <section className="container legal-page-copy">
        <p>Last updated: {legalContent?.terms?.lastUpdated || 'January 1, 2026'}</p>
        {termsSections.map((section) => (
          <div key={section.heading}>
            <h3>{section.heading}</h3>
            <p>{section.body}</p>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Terms;
