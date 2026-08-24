import SectionHeading from '../components/SectionHeading/SectionHeading';
import { getSiteContent } from '../services/siteContentService';

const Privacy = () => {
  const { pageCopy, legalContent } = getSiteContent();
  const privacySections = legalContent?.privacy?.sections || [];

  return (
    <main className="page-content">
      <section className="page-hero legal-hero">
        <div className="container">
          <SectionHeading title={pageCopy.privacyPage.title} subtitle={pageCopy.privacyPage.subtitle} />
        </div>
      </section>
      <section className="container legal-page-copy">
        <p>Last updated: {legalContent?.privacy?.lastUpdated || 'January 1, 2026'}</p>
        {privacySections.map((section) => (
          <div key={section.heading}>
            <h3>{section.heading}</h3>
            <p>{section.body}</p>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Privacy;
